import { Student } from "../api/report/route";
import { PageWrapper } from "./PageWrapper";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  cell: {
    flex: 1,
    fontSize: 12,
    padding: 4,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
});

export const StudentTablePage = ({ students }: { students: Student[] }) => (
  <PageWrapper title="Student Results">
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>ID</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Grade</Text>
          <Text style={styles.headerCell}>Overall %</Text>
          <Text style={styles.headerCell}>Attendance</Text>
        </View>

        {students.map((student) => (
          <View key={student.id} style={styles.row}>
            <Text style={[styles.cell, { flex: 0.5 }]}>{student.id}</Text>
            <Text style={styles.cell}>{student.name}</Text>
            <Text style={styles.cell}>{student.grade}</Text>
            <Text style={styles.cell}>{student.overall.percentage}%</Text>
            <Text style={styles.cell}>{student.overall.attendance}%</Text>
          </View>
        ))}
      </View>
    </View>
  </PageWrapper>
);