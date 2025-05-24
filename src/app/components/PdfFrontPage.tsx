// components/pdf-components/PdfFrontPage.tsx
import { PageWrapper } from "./PageWrapper";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: 60
  },
  title: {
    fontSize: 36,
    fontWeight: 'black',
    marginBottom: 15,
    color: '#1a365d',
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  subtitle: {
    fontSize: 20,
    color: '#4a5568',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 14,
    color: '#718096',
    marginTop: 20
  },
  academicYear: {
    fontSize: 16,
    color: '#2d3748',
    marginTop: 10
  }
});

export const PdfFrontPage = () => (
  <PageWrapper id="front" bookmark="Front Page">
    <View style={styles.container}>
      <Text style={styles.title}>Academic Excellence Report</Text>
      <Text style={styles.subtitle}>Comprehensive Student Analysis</Text>
      <Text style={styles.academicYear}>2023-2024 Academic Year</Text>
      <Text style={styles.date}>
        Generated: {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Text>
    </View>
  </PageWrapper>
);