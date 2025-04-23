import type { DashboardData, Widget } from "./types"

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          type: "donut",
          category: "CSPM",
          data: {
            total: 4,
            items: [
              { label: "Connected", value: 2, color: "#3b82f6" },
              { label: "Not Connected", value: 2, color: "#93c5fd" },
            ],
          },
        },
        {
          id: "risk-assessment",
          name: "Cloud Account Risk Assessment",
          type: "arc",
          category: "CSPM",
          data: {
            total: 9659,
            items: [
              { label: "Passed", value: 7253, color: "#10b981" },
              { label: "Warning", value: 681, color: "#fbbf24" },
              { label: "Not available", value: 36, color: "#d1d5db" },
              { label: "Failed", value: 1689, color: "#dc2626" },
            ],
          },
        },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          type: "noData",
          category: "CWPP",
          data: {
            total: 0,
            items: [],
          },
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          type: "noData",
          category: "CWPP",
          data: {
            total: 0,
            items: [],
          },
        },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          type: "bar",
          category: "Image",
          data: {
            total: 1470,
            items: [
              { label: "Critical", value: 9, color: "#7f1d1d" },
              { label: "High", value: 150, color: "#dc2626" },
              { label: "Medium", value: 800, color: "#f97316" },
              { label: "Low", value: 500, color: "#fbbf24" },
              { label: "Unknown", value: 111, color: "#d1d5db" },
            ],
          },
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          type: "bar",
          category: "Image",
          data: {
            total: 2,
            items: [
              { label: "Critical", value: 2, color: "#7f1d1d" },
              { label: "High", value: 2, color: "#dc2626" },
              { label: "Medium", value: 1, color: "#f97316" },
              { label: "Low", value: 1, color: "#fbbf24" },
              { label: "Unknown", value: 1, color: "#d1d5db" },
            ],
          },
        },
      ],
    },
  ],
}

export const availableWidgets: Widget[] = [
  {
    id: "cloud-accounts",
    name: "Cloud Accounts",
    type: "donut",
    category: "CSPM",
    data: {
      total: 4,
      items: [
        { label: "Connected", value: 2, color: "#3b82f6" },
        { label: "Not Connected", value: 2, color: "#93c5fd" },
      ],
    },
  },
  {
    id: "risk-assessment",
    name: "Cloud Account Risk Assessment",
    type: "arc",
    category: "CSPM",
    data: {
      total: 9659,
      items: [
        { label: "Failed", value: 1689, color: "#dc2626" },
        { label: "Warning", value: 681, color: "#fbbf24" },
        { label: "Not available", value: 36, color: "#d1d5db" },
        { label: "Passed", value: 7253, color: "#10b981" },
      ],
    },
  },
  {
    id: "namespace-alerts",
    name: "Top 5 Namespace Specific Alerts",
    type: "noData",
    category: "CWPP",
    data: {
      total: 0,
      items: [],
    },
  },
  {
    id: "workload-alerts",
    name: "Workload Alerts",
    type: "noData",
    category: "CWPP",
    data: {
      total: 0,
      items: [],
    },
  },
  {
    id: "image-risk",
    name: "Image Risk Assessment",
    type: "bar",
    category: "Image",
    data: {
      total: 1470,
      items: [
        { label: "Critical", value: 9, color: "#7f1d1d" },
        { label: "High", value: 150, color: "#dc2626" },
        { label: "Medium", value: 800, color: "#f97316" },
        { label: "Low", value: 500, color: "#fbbf24" },
        { label: "Unknown", value: 11, color: "#d1d5db" },
      ],
    },
  },
  {
    id: "image-security",
    name: "Image Security Issues",
    type: "bar",
    category: "Image",
    data: {
      total: 2,
      items: [
        { label: "Critical", value: 2, color: "#7f1d1d" },
        { label: "High", value: 2, color: "#dc2626" },
        { label: "Medium", value: 1, color: "#f97316" },
        { label: "Low", value: 1, color: "#fbbf24" },
        { label: "Unknown", value: 0, color: "#d1d5db" },
      ],
    },
  },
  {
    id: "cloud-compliance",
    name: "Cloud Compliance",
    type: "donut",
    category: "CSPM",
    data: {
      total: 100,
      items: [
        { label: "Compliant", value: 78, color: "#4ade80" },
        { label: "Non-Compliant", value: 22, color: "#ef4444" },
      ],
    },
  },
  {
    id: "security-posture",
    name: "Security Posture",
    type: "arc",
    category: "CSPM",
    data: {
      total: 100,
      items: [
        { label: "High Risk", value: 15, color: "#ef4444" },
        { label: "Medium Risk", value: 25, color: "#f59e0b" },
        { label: "Low Risk", value: 60, color: "#4ade80" },
      ],
    },
  },
  {
    id: "vulnerability-trends",
    name: "Vulnerability Trends",
    type: "noData",
    category: "Image",
    data: {
      total: 0,
      items: [],
    },
  },
  {
    id: "container-security",
    name: "Container Security",
    type: "bar",
    category: "CWPP",
    data: {
      total: 50,
      items: [
        { label: "Critical", value: 5, color: "#ef4444" },
        { label: "High", value: 10, color: "#f97316" },
        { label: "Medium", value: 15, color: "#f59e0b" },
        { label: "Low", value: 20, color: "#4ade80" },
      ],
    },
  },
  {
    id: "ticket-summary",
    name: "Ticket Summary",
    type: "donut",
    category: "Ticket",
    data: {
      total: 45,
      items: [
        { label: "Open", value: 15, color: "#3b82f6" },
        { label: "In Progress", value: 20, color: "#f59e0b" },
        { label: "Closed", value: 10, color: "#4ade80" },
      ],
    },
  },
  {
    id: "ticket-priority",
    name: "Ticket Priority",
    type: "bar",
    category: "Ticket",
    data: {
      total: 45,
      items: [
        { label: "High", value: 8, color: "#ef4444" },
        { label: "Medium", value: 22, color: "#f59e0b" },
        { label: "Low", value: 15, color: "#4ade80" },
      ],
    },
  },
]
