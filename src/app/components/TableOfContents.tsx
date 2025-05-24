// components/pdf-components/TableOfContents.tsx
import { PageWrapper } from "./PageWrapper";
import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'black',
    marginBottom: 25,
    color: '#1a365d',
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    paddingVertical: 4
  },
  text: {
    fontSize: 14,
    color: '#2d3748',
    textDecoration: 'none'
  },
  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
    marginHorizontal: 8,
    marginTop: 6
  }
});

export const TableOfContents = ({ subjects }: { subjects: string[] }) => (
  <PageWrapper 
    title="Table of Contents"
    bookmark="Table of Contents"
    id="toc"
  >
    <View style={styles.container}>
      {/* <Text style={styles.title}>Table of Contents</Text> */}
      
      {/* <TocItem title="Front Page" pageNumber={1} anchor="front" />
      <TocItem title="Table of Contents" pageNumber={2} anchor="toc" /> */}
      
      {subjects.map((subject, index) => (
        <TocItem
          key={subject}
          title={`${subject} Performance`}
          pageNumber={index + 3}
          anchor={subject.toLowerCase().replace(' ', '-')}
        />
      ))}
      
      <TocItem 
        title="Student Results" 
        pageNumber={subjects.length + 3} 
        anchor="results" 
      />
    </View>
  </PageWrapper>
);

const TocItem = ({ title, pageNumber, anchor }: { 
  title: string; 
  pageNumber: number; 
  anchor: string 
}) => (
  <View style={styles.item}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.text}>
        <Link src={`#${anchor}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.dottedLine} />
      <Text style={[styles.text, { fontWeight: 'bold' }]}>{pageNumber}</Text>
    </View>
  </View>
);