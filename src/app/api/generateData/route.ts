const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Sample name datasets
const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver',
  // ... add 40 more common first names
  'Mia', 'Ethan', 'Charlotte', 'Michael', 'Amelia', 'Alexander', 'Harper', 'Daniel', 'Evelyn', 'Matthew'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  // ... add 20 more common last names
  'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill'
];

interface SubjectData {
    score: number;
    attendance: number;
}

interface Subjects {
    [subject: string]: SubjectData;
}

interface Overall {
    percentage: number;
    attendance: number;
}

interface Student {
    id: string;
    name: string;
    grade: string;
    subjects: Subjects;
    overall: Overall;
}

function generateStudent(index: number): Student {
    const gradeLevels = ['9th', '10th', '11th', '12th'];
    const subjects = ['Math', 'Science', 'English'];
    
    // Generate realistic scores with normal distribution
    const generateScore = (subject: string): number => {
        const baseScores: { [key: string]: number } = { Math: 68, Science: 72, English: 75 };
        let score = baseScores[subject] + Math.floor(Math.random() * 20) - 10;
        return Math.max(0, Math.min(100, score));
    };

    // Generate attendance correlated with performance
    const generateAttendance = (score: number): number => {
        return Math.min(100, Math.max(70, score + Math.random() * 20 - 10));
    };

    const student: Student = {
        id: `S${(index + 1).toString().padStart(3, '0')}`,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
                    lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        grade: gradeLevels[index % 4], // Distribute evenly across grades
        subjects: {},
        overall: {
            percentage: 0,
            attendance: 0
        }
    };

    let totalScore = 0;
    let totalAttendance = 0;

    // Generate subject data
    subjects.forEach((subject: string) => {
        const score = generateScore(subject);
        const attendance = generateAttendance(score);
        
        student.subjects[subject] = {
            score: Math.round(score),
            attendance: Math.round(attendance)
        };
        
        totalScore += score;
        totalAttendance += attendance;
    });

    // Calculate overall percentages
    student.overall.percentage = Math.round(totalScore / subjects.length);
    student.overall.attendance = Math.round(totalAttendance / subjects.length);

    return student;
}

function calculateGradeDistribution(students: any[]) {
  const subjects = ['Math', 'Science', 'English'];
  const distribution: { [subject: string]: { [grade: string]: number } } = {};

  subjects.forEach(subject => {
    distribution[subject] = {
      A: 0, B: 0, C: 0, D: 0, F: 0
    };

    students.forEach((student: { subjects: { [x: string]: { score: any; }; }; }) => {
      const score = student.subjects[subject].score;
      let grade = 'F';
      
      if (score >= 90) grade = 'A';
      else if (score >= 80) grade = 'B';
      else if (score >= 70) grade = 'C';
      else if (score >= 60) grade = 'D';

      distribution[subject][grade]++;
    });
  });

  return Object.entries(distribution).map(([subject, grades]) => ({
    subject,
    gradeDistribution: ['A', 'B', 'C', 'D', 'F'],
    counts: Object.values(grades)
  }));
}

// Generate 500 students
const students = Array.from({ length: 500 }, (_, i) => generateStudent(i));

// Calculate subject performance
const subjectPerformance = calculateGradeDistribution(students);

// Create final dataset
const dataset = {
  students,
  subjectPerformance
};

// Save to public folder
const outputPath = path.join(process.cwd(), 'public', 'student-data.json');
fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));

console.log(`✅ Generated 500 student records at: ${outputPath}`);