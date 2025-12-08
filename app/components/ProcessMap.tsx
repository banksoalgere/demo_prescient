'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import dagre from 'dagre';
import { ProcessNode, ProcessFlow } from '../data/accounts-payable';

interface ProcessMapProps {
  nodes: ProcessNode[];
  flows: ProcessFlow[];
}

interface LayoutNode extends ProcessNode {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutLink extends ProcessFlow {
  points?: { x: number; y: number }[];
  rank?: number;
}

interface RankedEdge {
  source: string;
  target: string;
  count: number;
  avgDuration?: number;
  rank: number;
}

export default function ProcessMap({ nodes, flows }: ProcessMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [rankedEdges, setRankedEdges] = useState<RankedEdge[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 800 });

  // Handle dynamic resizing
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width: width || 1400, height: height || 800 });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create dagre graph
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 100, marginx: 40, marginy: 40 });
    g.setDefaultEdgeLabel(() => ({}));

    // Add synthetic start and end nodes
    const startNode: ProcessNode = {
      id: '__START__',
      name: 'Start',
      count: 0,
      type: 'start'
    };

    const endNode: ProcessNode = {
      id: '__END__',
      name: 'End',
      count: 0,
      type: 'end'
    };

    const allNodes = [startNode, ...nodes, endNode];

    // Add nodes to dagre
    allNodes.forEach(node => {
      if (node.id === '__START__') {
        g.setNode(node.id, { label: node.name, width: 40, height: 40 });
      } else if (node.id === '__END__') {
        g.setNode(node.id, { label: node.name, width: 50, height: 50 });
      } else {
        const estimatedWidth = Math.max(150, node.name.length * 7 + 70);
        g.setNode(node.id, { label: node.name, width: estimatedWidth, height: 60 });
      }
    });

    // Create synthetic edges
    const startActivities = nodes.filter(n => n.type === 'start');
    const endActivities = nodes.filter(n => n.type === 'end');

    const startEdges: ProcessFlow[] = startActivities.map(n => ({
      source: '__START__',
      target: n.id,
      count: 0
    }));

    const endEdges: ProcessFlow[] = endActivities.map(n => ({
      source: n.id,
      target: '__END__',
      count: 0
    }));

    const allFlows = [...startEdges, ...flows, ...endEdges];

    // Add edges to dagre
    allFlows.forEach(flow => {
      g.setEdge(flow.source, flow.target);
    });

    // Calculate layout
    dagre.layout(g);

    const graphWidth = g.graph().width || dimensions.width;
    const graphHeight = g.graph().height || dimensions.height;

    // Prepare layout data
    const layoutNodes: LayoutNode[] = allNodes.map(node => {
      const dagreNode = g.node(node.id);
      return {
        ...node,
        x: dagreNode.x,
        y: dagreNode.y,
        width: dagreNode.width,
        height: dagreNode.height,
      };
    });

    const layoutLinks: LayoutLink[] = allFlows.map(flow => {
      const dagreEdge = g.edge(flow.source, flow.target);
      return {
        ...flow,
        points: dagreEdge.points,
      };
    });

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        mainGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    const mainGroup = svg.append('g');

    // Initial transform
    const initialScale = Math.min(dimensions.width / graphWidth, dimensions.height / graphHeight, 1) * 0.9;
    const initialX = (dimensions.width - graphWidth * initialScale) / 2;
    const initialY = (dimensions.height - graphHeight * initialScale) / 2;

    svg.call(
      zoom.transform as any,
      d3.zoomIdentity.translate(initialX, initialY).scale(initialScale)
    );

    // Define markers
    const defs = mainGroup.append('defs');

    // Normal arrow
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 9)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#64748b');

    // Bottleneck arrow
    defs.append('marker')
      .attr('id', 'arrowhead-bottleneck')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 9)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#ef4444');

    // Draw edges
    const edgeGroup = mainGroup.append('g').attr('class', 'edges');

    const edgeSelection = edgeGroup.selectAll('.edge')
      .data(layoutLinks)
      .enter()
      .append('g')
      .attr('class', 'edge');

    // Edge paths
    edgeSelection.append('path')
      .attr('class', 'edge-path')
      .attr('d', d => {
        const points = d.points || [];
        if (points.length === 0) return '';
        const line = d3.line<{ x: number; y: number }>()
          .x(p => p.x)
          .y(p => p.y)
          .curve(d3.curveBasis);
        return line(points) || '';
      })
      .attr('fill', 'none')
      .attr('stroke', d => d.isBottleneck ? '#ef4444' : '#64748b')
      .attr('stroke-width', d => d.isBottleneck ? 3 : 2)
      .attr('marker-end', d => d.isBottleneck ? 'url(#arrowhead-bottleneck)' : 'url(#arrowhead)')
      .attr('opacity', 0.6);

    // Edge labels (only for non-synthetic edges)
    edgeSelection
      .filter(d => d.count > 0)
      .append('text')
      .attr('class', 'edge-label')
      .attr('x', d => {
        const points = d.points || [];
        return points.length > 0 ? points[Math.floor(points.length / 2)].x : 0;
      })
      .attr('y', d => {
        const points = d.points || [];
        return points.length > 0 ? points[Math.floor(points.length / 2)].y : 0;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .attr('font-size', '11px')
      .attr('fill', '#1e293b')
      .attr('font-weight', '500')
      .style('pointer-events', 'none')
      .text(d => d.count);

    // Draw nodes
    const nodeGroup = mainGroup.append('g').attr('class', 'nodes');

    const nodeSelection = nodeGroup.selectAll('.node')
      .data(layoutNodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer');

    // Start node (circle)
    nodeSelection
      .filter(d => d.id === '__START__')
      .append('circle')
      .attr('r', 20)
      .attr('fill', '#334155')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2);

    // End node (square)
    nodeSelection
      .filter(d => d.id === '__END__')
      .append('rect')
      .attr('x', -25)
      .attr('y', -25)
      .attr('width', 50)
      .attr('height', 50)
      .attr('fill', '#334155')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2);

    // Get node color
    const getNodeColor = (node: ProcessNode): string => {
      if (node.id === '__START__' || node.id === '__END__') return '#334155';
      return '#3b82f6'; // All activity nodes blue
    };

    // Regular activity nodes
    nodeSelection
      .filter(d => d.id !== '__START__' && d.id !== '__END__')
      .append('rect')
      .attr('x', d => -(d.width / 2))
      .attr('y', -30)
      .attr('width', d => d.width)
      .attr('height', 60)
      .attr('rx', 8)
      .attr('fill', d => getNodeColor(d))
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2);

    // Node labels
    nodeSelection.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => {
        if (d.id === '__START__' || d.id === '__END__') return 35;
        return 5;
      })
      .attr('font-size', d => {
        if (d.id === '__START__' || d.id === '__END__') return '10px';
        return '14px';
      })
      .attr('fill', d => {
        if (d.id === '__START__' || d.id === '__END__') return '#1e293b';
        return 'white';
      })
      .attr('font-weight', '600')
      .style('pointer-events', 'none')
      .text(d => d.name);

    // Add count badges
    nodeSelection
      .filter(d => d.id !== '__START__' && d.id !== '__END__')
      .each(function(d) {
        const node = d3.select(this);

        // Badge background
        node.append('rect')
          .attr('x', d.width / 2 - 50)
          .attr('y', -30)
          .attr('width', 45)
          .attr('height', 20)
          .attr('rx', 10)
          .attr('fill', 'white')
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 1.5);

        // Badge text
        node.append('text')
          .attr('x', d.width / 2 - 27.5)
          .attr('y', -15)
          .attr('text-anchor', 'middle')
          .attr('font-size', '11px')
          .attr('fill', '#1e293b')
          .attr('font-weight', '700')
          .style('pointer-events', 'none')
          .text(d.count);
      });

    // Node hover
    nodeSelection
      .on('mouseenter', function() {
        d3.select(this).selectAll('rect, circle')
          .attr('stroke-width', 4)
          .attr('stroke', '#fbbf24');
      })
      .on('mouseleave', function() {
        d3.select(this).selectAll('rect, circle')
          .attr('stroke-width', 2)
          .attr('stroke', '#1e293b');
      });

    // Node click for ranking
    nodeSelection.on('click', function(_event, clickedNode) {
      setSelectedNode(clickedNode.id);

      // Get connected edges
      const connectedEdges = layoutLinks.filter(
        d => (d.source === clickedNode.id || d.target === clickedNode.id) && d.count > 0
      );

      // Sort by count and assign ranks
      const sortedEdges = connectedEdges
        .sort((a, b) => b.count - a.count)
        .map((edge, index) => ({
          source: edge.source,
          target: edge.target,
          count: edge.count,
          avgDuration: edge.avgDuration,
          rank: index + 1,
        }));

      setRankedEdges(sortedEdges);

      // Purple color scale
      const purpleScale = d3.scaleSequential(d3.interpolateRgb('#6b21a8', '#e9d5ff'))
        .domain([1, Math.max(sortedEdges.length, 1)]);

      // Create rank map
      const edgeRankMap = new Map<string, number>();
      sortedEdges.forEach(edge => {
        edgeRankMap.set(`${edge.source}-${edge.target}`, edge.rank);
      });

      // Reset all edges
      edgeSelection.select('.edge-path')
        .attr('opacity', 0.2)
        .attr('stroke-width', 2);

      // Remove existing rank labels
      edgeSelection.selectAll('.rank-label').remove();

      // Style connected edges
      edgeSelection.each(function(d) {
        const edgeKey = `${d.source}-${d.target}`;
        const rank = edgeRankMap.get(edgeKey);

        if (rank) {
          const edge = d3.select(this);

          edge.select('.edge-path')
            .attr('opacity', 1)
            .attr('stroke', purpleScale(rank))
            .attr('stroke-width', Math.max(6 - rank * 0.5, 2));

          // Add rank badge
          const points = d.points || [];
          if (points.length > 0) {
            const midPoint = points[Math.floor(points.length / 2)];

            edge.append('circle')
              .attr('class', 'rank-label')
              .attr('cx', midPoint.x + 20)
              .attr('cy', midPoint.y - 15)
              .attr('r', 12)
              .attr('fill', purpleScale(rank))
              .attr('stroke', '#1e293b')
              .attr('stroke-width', 2);

            edge.append('text')
              .attr('class', 'rank-label')
              .attr('x', midPoint.x + 20)
              .attr('y', midPoint.y - 15)
              .attr('text-anchor', 'middle')
              .attr('dy', 4)
              .attr('font-size', '11px')
              .attr('fill', 'white')
              .attr('font-weight', '700')
              .text(rank);
          }
        }
      });

      // Reset nodes
      nodeSelection.selectAll('rect, circle').attr('opacity', 0.3);

      // Highlight connected nodes
      const connectedNodeIds = new Set<string>();
      connectedNodeIds.add(clickedNode.id);
      layoutLinks.forEach(link => {
        if (link.source === clickedNode.id) connectedNodeIds.add(link.target);
        if (link.target === clickedNode.id) connectedNodeIds.add(link.source);
      });

      nodeSelection
        .filter(d => connectedNodeIds.has(d.id))
        .selectAll('rect, circle')
        .attr('opacity', 1);
    });

    // Double-click to reset
    svg.on('dblclick.reset', () => {
      setSelectedNode(null);
      setRankedEdges([]);
      edgeSelection.selectAll('.rank-label').remove();
      edgeSelection.select('.edge-path')
        .attr('opacity', 0.6)
        .attr('stroke-width', d => d.isBottleneck ? 3 : 2)
        .attr('stroke', d => d.isBottleneck ? '#ef4444' : '#64748b');
      nodeSelection.selectAll('rect, circle').attr('opacity', 1);
    });

  }, [nodes, flows, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[800px] bg-gray-50 rounded-lg border border-gray-300 relative flex">
      <svg ref={svgRef} className="flex-1" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg text-sm border border-gray-200">
        <p className="font-semibold mb-2 text-gray-900">Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
            <span className="text-gray-700">Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-700"></div>
            <span className="text-gray-700">End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-red-500"></div>
            <span className="text-gray-700">Bottleneck</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-200">
          Click node to rank edges<br />
          Double-click to reset
        </p>
      </div>

      {/* Side Panel */}
      {rankedEdges.length > 0 && (
        <div className="w-80 bg-white border-l border-gray-300 shadow-xl overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Ranked Connections</h3>
              <button
                onClick={() => {
                  setSelectedNode(null);
                  setRankedEdges([]);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedNode && selectedNode !== '__START__' && selectedNode !== '__END__' && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium text-purple-700">{selectedNode}</span>
              </p>
            )}
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {rankedEdges.map((edge) => {
                const purpleScale = d3.scaleSequential(d3.interpolateRgb('#6b21a8', '#e9d5ff'))
                  .domain([1, Math.max(rankedEdges.length, 1)]);
                const rankColor = purpleScale(edge.rank);

                return (
                  <div
                    key={`${edge.source}-${edge.target}`}
                    className="border-2 border-gray-200 rounded-xl p-3 hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-gray-800 shadow-md"
                        style={{ backgroundColor: rankColor }}
                      >
                        {edge.rank}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                          {edge.source} → {edge.target}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-600">Executions:</span>
                            <span className="font-bold text-gray-900">{edge.count.toLocaleString()}</span>
                          </div>
                          {edge.avgDuration !== undefined && edge.avgDuration > 0 && (
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-600">Avg Time:</span>
                              <span className="font-bold text-gray-900">{edge.avgDuration.toFixed(1)}h</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
