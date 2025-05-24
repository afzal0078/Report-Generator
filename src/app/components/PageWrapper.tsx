// components/pdf-components/PageWrapper.tsx
import { Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    position: 'relative',
    minHeight: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  logo: {
    width: 120,
    height: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'extrabold',
    color: '#2d3748'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#718096'
  },
  contentWrapper: {
    flexGrow: 1,
    paddingTop: 20
  }
});

export const PageWrapper = ({ 
  children, 
  title = '',
  bookmark,
  id 
}: {
  children: React.ReactNode;
  title?: string;
  bookmark?: string;
  id?: string;
}) => (
  <Page 
    size="A4" 
    style={styles.page}
    bookmark={{ title: bookmark ?? '', fit: true }}
    id={id}
  >
    <View style={styles.header}>
      <Image src="public/images/school-logo.png" style={styles.logo} />
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={{ width: 120 }} />
    </View>

    <View style={styles.contentWrapper}>
      {children}
    </View>

    <Text style={styles.footer} fixed>
      © {new Date().getFullYear()} Academic Progress Report - Confidential
    </Text>
  </Page>
);