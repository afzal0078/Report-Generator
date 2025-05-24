// src/utils/chart-generator.ts
import * as echarts from 'echarts';
import { createCanvas } from 'canvas';
import { SubjectPerformance } from '@/types/performance';

const WIDTH = 1400;  // Increased canvas size
const HEIGHT = 1000;

export const generateSubjectChart = async (
  subject: SubjectPerformance
): Promise<string> => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const chart = echarts.init(canvas as any);

  // Calculate total for percentage calculations
  const total = subject.counts.reduce((sum, count) => sum + count, 0);

  const option = {
    title: {
      text: `${subject.subject} Grade Distribution`,
      left: 'center',
      textStyle: {
        fontSize: 36,  // Increased title size
        fontWeight: 'bold',
        color: '#2d3748'
      },
      padding: [20, 0]
    },
    tooltip: {
      trigger: 'item',
      formatter: ({ data }: any) => {
        const percentage = ((data.value / total) * 100).toFixed(1);
        return `${data.name}: ${data.value} (${percentage}%)`;
      }
    },
    legend: {
      orient: 'vertical',
      right: 40,
      top: 'center',
      textStyle: {
        fontSize: 24,  // Increased legend text
        color: '#4a5568'
      },
      itemWidth: 30,   // Larger legend items
      itemHeight: 24,
      formatter: (name: string) => {
        const data = subject.gradeDistribution.map((grade, index) => ({
          name: grade,
          value: subject.counts[index]
        })).find(item => item.name === name);;
        return `${name} (${data?.value || 0})`;
      }
    },
    series: [{
      name: 'Grades',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      data: subject.gradeDistribution.map((grade, index) => ({
        value: subject.counts[index],
        name: grade
      })),
      label: {
        show: true,
        position: 'outside',
        fontSize: 24,  // Increased label size
        fontWeight: 'bold',
        color: '#2d3748',
        formatter: ({ name, percent }: any) => 
          `${name}\n{bold|${percent.toFixed(1)}%}`,
        rich: {
          bold: {
            fontWeight: 'bold',
            fontSize: 28  // Larger percentage
          }
        }
      },
      labelLine: {
        length: 40,     // Longer label lines
        length2: 40,
        lineStyle: {
          width: 2
        }
      },
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 4
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  const buffer = canvas.toBuffer('image/png');
  return `data:image/png;base64,${buffer.toString('base64')}`;
};