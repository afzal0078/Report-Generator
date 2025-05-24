// components/pdf-components/PerformanceChartPage.tsx
import { PageWrapper } from "./PageWrapper";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30
  },
  chartContainer: {
    margin: 15,
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2d3748',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  chartImage: {
    width: '100%',
    height: 360,
    borderRadius: 4
  },
  note: {
    fontSize: 10,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8
  }
});

export const PerformanceChartPage = ({
  title,
  chartImage,
  id
}: {
  title: string;
  chartImage: string;
  id: string;
}) => (
  <PageWrapper title={title} bookmark={title} id={id}>
    <View style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <View style={styles.chartContainer}>
        <Image src={chartImage} style={styles.chartImage} />
        <Text style={styles.note}>* Data based on official academic records</Text>
      </View>
    </View>
  </PageWrapper>
);