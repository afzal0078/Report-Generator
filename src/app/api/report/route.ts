import { Document, pdf, renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { generateSubjectChart } from "@/utils/chart-generator";
import { Student, SubjectPerformance } from "@/types/performance";
import React from "react";

const getPdfComponents = async () => {
  const mod = await import("@/app/components/pdf-components");
  return {
    PdfFrontPage: mod.PdfFrontPage,
    TableOfContents: mod.TableOfContents,
    PerformanceChartPage: mod.PerformanceChartPage,
    StudentTablePage: mod.StudentTablePage
  };
};

export async function GET(request: NextRequest) {
  try {
    // Construct proper URL for public file
    const baseUrl = process.env.NEXT_PUBLIC_URL || `${request.nextUrl.origin}`;
    const dataUrl = `${baseUrl}/student-data.json`;
    
    // Load sample data
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    const students: Student[] = data.students;
    const subjectPerformance: SubjectPerformance[] = data.subjectPerformance;

    // Generate charts
    const performanceCharts = await Promise.all(
      subjectPerformance.map(async (subject) => ({
        subject: subject.subject,
        chart: await generateSubjectChart(subject)
      }))
    );

    // Load PDF components
    const {
      PdfFrontPage,
      TableOfContents,
      PerformanceChartPage,
      StudentTablePage
    } = await getPdfComponents();

// Create PDF document using React.createElement (no JSX in API routes)
const pdfDoc = React.createElement(
  Document,
  null,
  React.createElement(PdfFrontPage, null),
  React.createElement(TableOfContents, {
    subjects: subjectPerformance.map(sp => sp.subject)
  }),
  ...performanceCharts.map((chart, index) =>
    React.createElement(PerformanceChartPage, {
      key: index,
      title: `${chart.subject} Performance`,
      chartImage: chart.chart,
      id: chart.subject.toLowerCase().replace(' ', '-')
    })
  ),
  React.createElement(StudentTablePage, {
    students: students
  })
);

    const pdfBuffer = await renderToBuffer(pdfDoc);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="student-report.pdf"`
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

export type { Student };
