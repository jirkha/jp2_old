import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import logo from "../../../assets/JP_logo_black.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const InvoicePDF = () => {
  return (
    <>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed></Text>
          <Image style={styles.image} src={logo} />
          <Text style={styles.text}>
            Oh right. I forgot about the battle. Wow, you got that off the hey
            make you work, but they don't pay you or let you go.
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page>
      </Document>
    </>
  );
};

export default InvoicePDF;
