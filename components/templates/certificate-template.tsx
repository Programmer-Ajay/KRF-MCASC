/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

export interface PdfCertificateData {
  id: string;
  recipientName: string;
  classAndCourse: string;
  collegeName: string;
  eventName: string;
  rankText: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#fff',
  },
  
  // Background Layer
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Text Layer Container
  textLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  // --- 1. RECIPIENT NAME ---
  nameSection: {
    position: 'absolute',
    top: '44.8%',        
    left: '15%',       
    width: '70%',      
    textAlign: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,       // Reduced size for better look
    fontFamily: 'Helvetica-Bold',
    color: '#000',
    textTransform: 'uppercase',
  },

  // --- 2. DETAILS ROW ---
  detailsRow: {
    position: 'absolute',
    top: '51.2%',       
    left: 0,
    width: '100%',
    flexDirection: 'row',
    
  },
  
  // Class Section
  classSection: {
    position: 'absolute',
    left: '18%',      
    width: '24%',     
    textAlign: 'center',
    justifyContent: 'center',
  },

  // College Section
  collegeSection: {
    position: 'absolute',
    left: '47%',       
    width: '38%',     
    textAlign: 'center',
    justifyContent: 'center',
  },

  detailText: {
    fontSize: 19,      // Increased size for readability
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    textTransform:'capitalize',
    textOverflow:'ellipsis',
    maxLines:1

  },

  // --- 3. EVENT NAME ---
  eventSection: {
    position: 'absolute',
    top: '58.1%',      
    left: '26%',
    width: '50%',      
    textAlign: 'center',
    justifyContent: 'center',
  },
  eventText: {
    fontSize: 19,     
    fontFamily: 'Helvetica-Bold',
    color: '#000',
    textTransform:'capitalize'
  },

  // --- 4. RANK / POSITION ---
  rankSection: {
    position: 'absolute',
    top: '65.2%',        
    left: '35%', 
    width: '30%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 19,
    fontFamily: 'Helvetica-Bold',
    color: '#000', 
    textTransform: 'uppercase',
  }
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const imageUrl = `${baseUrl}/images/certificate-bg.jpeg`;

export const CertificateDocument = ({ certificates }: { certificates: PdfCertificateData[] }) => (
  <Document>
    {certificates.map((cert) => (
      <Page key={cert.id} size="A4" orientation="landscape" style={styles.page}>
        
        {/* Layer 1: Image */}
        <View style={styles.backgroundLayer} fixed>
           <Image src={imageUrl} style={styles.backgroundImage} />
        </View>

        {/* Layer 2: Text */}
        <View style={styles.textLayer}>
            
            {/* 1. Name */}
            <View style={styles.nameSection}>
                <Text style={styles.nameText}>{cert.recipientName}</Text>
            </View>

            {/* 2. Class & College */}
            <View style={styles.detailsRow}>
                <View style={styles.classSection}>
                    <Text style={styles.detailText} >
                        {cert.classAndCourse}
                    </Text>
                </View>
                <View style={styles.collegeSection}>
                    <Text style={styles.detailText} >
                        {cert.collegeName}
                    </Text>
                </View>
            </View>

            {/* 3. Event */}
            <View style={styles.eventSection}>
                <Text style={styles.eventText}>{cert.eventName}</Text>
            </View>

            {/* 4. Rank */}
            <View style={styles.rankSection}>
                <Text style={styles.rankText}>{cert.rankText}</Text>
            </View>

        </View>
      </Page>
    ))}
  </Document>
);