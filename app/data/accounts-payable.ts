// Hardcoded Accounts Payable process data with realistic scale

// Helper functions for generating realistic data
function generateRealisticCSV(): string {
  const vendors = [
    'ABC Supplies', 'XYZ Corp', 'Tech Solutions', 'Global Partners', 'Premium Vendors',
    'Office Depot Inc', 'Industrial Supplies Co', 'Digital Services Ltd', 'Cloud Systems',
    'Enterprise Solutions', 'Logistics Partners', 'Manufacturing Direct', 'Retail Supplies',
    'Professional Services Inc', 'Consulting Group', 'Software Licensing Co', 'Hardware Depot',
    'Marketing Solutions', 'Facilities Management', 'Security Services'
  ];

  const resources = {
    clerks: ['Sarah Johnson', 'John Smith', 'Emily Davis', 'Michael Brown', 'Lisa Anderson', 'David Wilson'],
    managers: ['Mike Chen', 'Lisa Wang', 'Jennifer Martinez', 'Robert Taylor'],
    directors: ['Robert Kim', 'Patricia Lee', 'James Anderson']
  };

  const lines: string[] = ['Case ID,Activity,Timestamp,Resource,Amount,Vendor'];

  // Generate 2500 invoice cases spanning 3 months
  const startDate = new Date('2024-01-01T08:00:00');
  const numCases = 2500;

  for (let i = 1; i <= numCases; i++) {
    const caseId = `INV${String(i).padStart(5, '0')}`;
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const amount = Math.floor(Math.random() * 49500) + 500; // $500 - $50,000

    // Random date within 3 months
    const daysOffset = Math.floor(Math.random() * 90);
    const hoursOffset = Math.floor(Math.random() * 9); // 8am - 5pm
    const baseDate = new Date(startDate);
    baseDate.setDate(baseDate.getDate() + daysOffset);
    baseDate.setHours(8 + hoursOffset);

    let currentTime = new Date(baseDate);

    // Determine workflow path
    const pathRandom = Math.random();

    if (pathRandom < 0.75) {
      // Happy path (75%)
      const clerk = resources.clerks[Math.floor(Math.random() * resources.clerks.length)];
      const manager = resources.managers[Math.floor(Math.random() * resources.managers.length)];

      lines.push(`${caseId},Invoice Received,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 45);

      lines.push(`${caseId},Manual Data Entry,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 30);

      lines.push(`${caseId},Approval Request,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 60 + Math.random() * 240); // 1-5 hours

      lines.push(`${caseId},Manager Review,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 5 + Math.random() * 20);

      lines.push(`${caseId},Approval Granted,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 30);

      lines.push(`${caseId},Payment Scheduled,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addHours(currentTime, 18 + Math.random() * 6); // Next day

      lines.push(`${caseId},Payment Processed,${formatTimestamp(currentTime)},Finance System,${amount},${vendor}`);

    } else if (pathRandom < 0.87) {
      // Rejection path - Missing PO (12%)
      const clerk = resources.clerks[Math.floor(Math.random() * resources.clerks.length)];
      const manager = resources.managers[Math.floor(Math.random() * resources.managers.length)];

      lines.push(`${caseId},Invoice Received,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 45);

      lines.push(`${caseId},Manual Data Entry,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 30);

      lines.push(`${caseId},Approval Request,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 60 + Math.random() * 240);

      lines.push(`${caseId},Manager Review,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 5 + Math.random() * 15);

      lines.push(`${caseId},Rejected - Missing PO,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 20);

      lines.push(`${caseId},Request PO Number,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addHours(currentTime, 12 + Math.random() * 36); // Vendor delay

      lines.push(`${caseId},PO Number Provided,${formatTimestamp(currentTime)},Vendor Contact,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 20 + Math.random() * 40);

      lines.push(`${caseId},Manual Data Entry,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 30);

      lines.push(`${caseId},Approval Request,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 60 + Math.random() * 240);

      lines.push(`${caseId},Manager Review,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 5 + Math.random() * 20);

      lines.push(`${caseId},Approval Granted,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 30);

      lines.push(`${caseId},Payment Scheduled,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addHours(currentTime, 18 + Math.random() * 6);

      lines.push(`${caseId},Payment Processed,${formatTimestamp(currentTime)},Finance System,${amount},${vendor}`);

    } else if (pathRandom < 0.95) {
      // Duplicate invoice path (8%)
      const clerk = resources.clerks[Math.floor(Math.random() * resources.clerks.length)];
      const manager = resources.managers[Math.floor(Math.random() * resources.managers.length)];

      lines.push(`${caseId},Invoice Received,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 45);

      lines.push(`${caseId},Manual Data Entry,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 30);

      lines.push(`${caseId},Approval Request,${formatTimestamp(currentTime)},System,${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 60 + Math.random() * 240);

      lines.push(`${caseId},Manager Review,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 5 + Math.random() * 15);

      lines.push(`${caseId},Rejected - Duplicate Invoice,${formatTimestamp(currentTime)},${manager},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 20);

      lines.push(`${caseId},Investigation,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 20 + Math.random() * 40);

      lines.push(`${caseId},Duplicate Confirmed,${formatTimestamp(currentTime)},${clerk},${amount},${vendor}`);
      currentTime = addMinutes(currentTime, 5 + Math.random() * 15);

      lines.push(`${caseId},Invoice Cancelled,${formatTimestamp(currentTime)},System,${amount},${vendor}`);

    } else {
      // Escalation path - High value (5%)
      const clerk = resources.clerks[Math.floor(Math.random() * resources.clerks.length)];
      const manager = resources.managers[Math.floor(Math.random() * resources.managers.length)];
      const director = resources.directors[Math.floor(Math.random() * resources.directors.length)];
      const highAmount = Math.floor(Math.random() * 30000) + 20000; // $20k - $50k

      lines.push(`${caseId},Invoice Received,${formatTimestamp(currentTime)},System,${highAmount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 45);

      // Sometimes double data entry for complex invoices
      lines.push(`${caseId},Manual Data Entry,${formatTimestamp(currentTime)},${clerk},${highAmount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 30);

      if (Math.random() > 0.5) {
        lines.push(`${caseId},Manual Data Entry,${formatTimestamp(currentTime)},${clerk},${highAmount},${vendor}`);
        currentTime = addMinutes(currentTime, 10 + Math.random() * 20);
      }

      lines.push(`${caseId},Approval Request,${formatTimestamp(currentTime)},System,${highAmount},${vendor}`);
      currentTime = addMinutes(currentTime, 60 + Math.random() * 240);

      lines.push(`${caseId},Manager Review,${formatTimestamp(currentTime)},${manager},${highAmount},${vendor}`);
      currentTime = addMinutes(currentTime, 10 + Math.random() * 30);

      lines.push(`${caseId},Escalation to Director,${formatTimestamp(currentTime)},${manager},${highAmount},${vendor}`);
      currentTime = addHours(currentTime, 12 + Math.random() * 24); // Director delay

      lines.push(`${caseId},Director Review,${formatTimestamp(currentTime)},${director},${highAmount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 45);

      lines.push(`${caseId},Approval Granted,${formatTimestamp(currentTime)},${director},${highAmount},${vendor}`);
      currentTime = addMinutes(currentTime, 15 + Math.random() * 30);

      lines.push(`${caseId},Payment Scheduled,${formatTimestamp(currentTime)},System,${highAmount},${vendor}`);
      currentTime = addHours(currentTime, 18 + Math.random() * 6);

      lines.push(`${caseId},Payment Processed,${formatTimestamp(currentTime)},Finance System,${highAmount},${vendor}`);
    }
  }

  return lines.join('\n');
}

function formatTimestamp(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

// Generate the realistic CSV data once
export const ACCOUNTS_PAYABLE_CSV = generateRealisticCSV();

export interface ProcessEvent {
  caseId: string;
  activity: string;
  timestamp: Date;
  resource: string;
  amount: number;
  vendor: string;
}

export interface ProcessFlow {
  source: string;
  target: string;
  count: number;
  avgDuration?: number;
  totalDuration?: number;
  isBottleneck?: boolean;
  bottleneckScore?: number;
}

export interface ProcessNode {
  id: string;
  name: string;
  count: number;
  avgDuration?: number;
  totalDuration?: number;
  percentage?: number;
  type?: 'start' | 'end' | 'task' | 'manual' | 'approval' | 'rejection' | 'system';
  isBottleneck?: boolean;
}

export function parseCSV(csvData: string): ProcessEvent[] {
  const lines = csvData.trim().split('\n');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      caseId: values[0],
      activity: values[1],
      timestamp: new Date(values[2]),
      resource: values[3],
      amount: parseFloat(values[4]),
      vendor: values[5]
    };
  });
}

export function generateProcessMap(events: ProcessEvent[]): { nodes: ProcessNode[], flows: ProcessFlow[] } {
  const activityCounts = new Map<string, number>();
  const flowCounts = new Map<string, number>();
  const flowDurations = new Map<string, number[]>();
  const activityDurations = new Map<string, number[]>();

  // Group events by case
  const caseMap = new Map<string, ProcessEvent[]>();
  events.forEach(event => {
    if (!caseMap.has(event.caseId)) {
      caseMap.set(event.caseId, []);
    }
    caseMap.get(event.caseId)!.push(event);
  });

  // Count activities and flows, calculate durations
  caseMap.forEach(caseEvents => {
    caseEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    caseEvents.forEach((event, index) => {
      activityCounts.set(event.activity, (activityCounts.get(event.activity) || 0) + 1);

      if (index < caseEvents.length - 1) {
        const nextEvent = caseEvents[index + 1];
        const flowKey = `${event.activity}→${nextEvent.activity}`;
        flowCounts.set(flowKey, (flowCounts.get(flowKey) || 0) + 1);

        // Calculate duration in hours
        const duration = (nextEvent.timestamp.getTime() - event.timestamp.getTime()) / (1000 * 60 * 60);
        if (!flowDurations.has(flowKey)) {
          flowDurations.set(flowKey, []);
        }
        flowDurations.get(flowKey)!.push(duration);

        if (!activityDurations.has(event.activity)) {
          activityDurations.set(event.activity, []);
        }
        activityDurations.get(event.activity)!.push(duration);
      }
    });
  });

  // Calculate total events for percentages
  const totalEvents = events.length;

  // Determine activity types
  const getActivityType = (name: string): ProcessNode['type'] => {
    if (name.includes('Invoice Received')) return 'start';
    if (name.includes('Payment Processed') || name.includes('Cancelled')) return 'end';
    if (name.includes('Manual')) return 'manual';
    if (name.includes('Approval') || name.includes('Review')) return 'approval';
    if (name.includes('Rejected')) return 'rejection';
    return 'task';
  };

  // Create nodes with enhanced data
  const nodes: ProcessNode[] = Array.from(activityCounts.entries()).map(([name, count]) => {
    const durations = activityDurations.get(name) || [];
    const avgDuration = durations.length > 0
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length
      : 0;
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);

    return {
      id: name,
      name,
      count,
      avgDuration,
      totalDuration,
      percentage: (count / totalEvents) * 100,
      type: getActivityType(name),
      isBottleneck: avgDuration > 3 // Mark as bottleneck if avg duration > 3 hours
    };
  });

  // Calculate bottleneck scores for flows
  const allFlowDurations = Array.from(flowDurations.values()).flat();
  const q75 = quantile(allFlowDurations, 0.75);
  const q90 = quantile(allFlowDurations, 0.90);

  // Create flows with enhanced data
  const flows: ProcessFlow[] = Array.from(flowCounts.entries()).map(([key, count]) => {
    const [source, target] = key.split('→');
    const durations = flowDurations.get(key) || [];
    const avgDuration = durations.length > 0
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length
      : 0;
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);

    // Calculate bottleneck score (0-100)
    let bottleneckScore = 0;
    if (avgDuration > q90) {
      bottleneckScore = 90 + ((avgDuration - q90) / q90) * 10;
    } else if (avgDuration > q75) {
      bottleneckScore = 75 + ((avgDuration - q75) / (q90 - q75)) * 15;
    } else {
      bottleneckScore = (avgDuration / q75) * 75;
    }

    return {
      source,
      target,
      count,
      avgDuration,
      totalDuration,
      isBottleneck: avgDuration > q75,
      bottleneckScore: Math.min(100, bottleneckScore)
    };
  });

  return { nodes, flows };
}

// Helper function to calculate quantile
function quantile(arr: number[], q: number): number {
  const sorted = arr.slice().sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

export interface AutomationRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timesSaved: string;
  affectedActivities: string[];
  implementation: string;
}

export function generateRecommendations(events: ProcessEvent[]): AutomationRecommendation[] {
  const activityCounts = new Map<string, number>();
  events.forEach(event => {
    activityCounts.set(event.activity, (activityCounts.get(event.activity) || 0) + 1);
  });

  const recommendations: AutomationRecommendation[] = [];

  // Check for manual data entry
  const manualEntryCount = activityCounts.get('Manual Data Entry') || 0;
  if (manualEntryCount > 0) {
    recommendations.push({
      title: 'Automate Invoice Data Extraction',
      description: 'Implement OCR and AI-powered data extraction to automatically capture invoice details from PDFs and emails, eliminating manual data entry.',
      impact: 'high',
      timesSaved: `~${Math.round(manualEntryCount * 15 / 60)} hours per week`,
      affectedActivities: ['Manual Data Entry', 'Invoice Received'],
      implementation: 'Use document intelligence APIs (e.g., Azure Form Recognizer, Google Document AI) to extract structured data from invoices.'
    });
  }

  // Check for rejections and rework
  const rejectionCount = events.filter(e => e.activity.includes('Rejected')).length;
  if (rejectionCount > 0) {
    recommendations.push({
      title: 'Implement Smart Validation Rules',
      description: 'Add automated pre-validation checks for PO numbers, duplicate invoices, and vendor information before approval routing to reduce rejections and rework.',
      impact: 'high',
      timesSaved: `~${Math.round(rejectionCount * 30 / 60)} hours per week`,
      affectedActivities: ['Rejected - Missing PO', 'Rejected - Duplicate Invoice', 'Request PO Number'],
      implementation: 'Configure business rules engine to validate invoices against PO database and historical invoice records automatically.'
    });
  }

  // Check for approval routing complexity
  const escalationCount = events.filter(e => e.activity.includes('Escalation')).length;
  if (escalationCount > 0) {
    recommendations.push({
      title: 'Smart Approval Routing',
      description: 'Implement intelligent approval routing based on amount thresholds, vendor types, and department budgets to automatically route to the correct approver.',
      impact: 'medium',
      timesSaved: `~${Math.round(escalationCount * 20 / 60)} hours per week`,
      affectedActivities: ['Escalation to Director', 'Approval Request'],
      implementation: 'Set up workflow rules that automatically determine approval hierarchy based on invoice attributes (amount, vendor, category).'
    });
  }

  // Always recommend payment automation
  recommendations.push({
    title: 'Streamline Payment Processing',
    description: 'Connect approval system directly to payment systems (ERP/Banking) to automatically schedule and process payments without manual intervention.',
    impact: 'medium',
    timesSaved: `~${Math.round(events.filter(e => e.activity === 'Payment Scheduled').length * 10 / 60)} hours per week`,
    affectedActivities: ['Payment Scheduled', 'Payment Processed'],
    implementation: 'Integrate with ERP system APIs to automatically create payment batches and transmit to banking systems upon approval.'
  });

  // Duplicate detection
  const duplicateInvestigations = events.filter(e => e.activity.includes('Investigation') || e.activity.includes('Duplicate')).length;
  if (duplicateInvestigations > 0) {
    recommendations.push({
      title: 'AI-Powered Duplicate Detection',
      description: 'Use machine learning to detect potential duplicate invoices at the point of receipt by analyzing invoice numbers, amounts, dates, and vendor information.',
      impact: 'medium',
      timesSaved: `~${Math.round(duplicateInvestigations * 25 / 60)} hours per week`,
      affectedActivities: ['Investigation', 'Duplicate Confirmed', 'Invoice Cancelled'],
      implementation: 'Implement fuzzy matching algorithms and ML models trained on historical invoice data to flag potential duplicates with confidence scores.'
    });
  }

  return recommendations;
}
