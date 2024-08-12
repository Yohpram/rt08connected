import React from "react";
import { Box, Heading, Text, List, ListItem, ListIcon, Divider } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

function About() {
  return (
    <Box maxW="800px" mx="auto" p="6" fontFamily="body" lineHeight="1.6" color="gray.700">
      <Heading as="h1" textAlign="center" color="teal.600" mb="6">
        Tentang Kami
      </Heading>
      <Text mb="6" textAlign="justify">
        Selamat datang di <Text as="strong" color="teal.500">RT8Connect</Text>, solusi komprehensif untuk administrasi lingkungan RT08. Platform kami dirancang khusus untuk memenuhi kebutuhan komunitas RT (Rukun Tetangga), menawarkan berbagai layanan untuk mempermudah tugas administrasi dan meningkatkan pengelolaan komunitas.
      </Text>
      <Text mb="6" textAlign="justify">
        Di <Text as="strong" color="teal.500">RT8Connect</Text>, kami menyediakan dua layanan utama:
      </Text>
      <List spacing={3} pl="4" mb="6">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="teal.500" />
          <Text as="strong" color="teal.500">Pembuatan Surat Keterangan:</Text> Buat berbagai jenis surat resmi yang diperlukan untuk berbagai keperluan, seperti surat keterangan domisili, izin usaha, dan dokumen administratif lainnya. Antarmuka kami yang ramah pengguna memastikan bahwa Anda dapat menghasilkan surat-surat ini dengan efisien dan akurat.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="teal.500" />
          <Text as="strong" color="teal.500">Konfirmasi Pembayaran Iuran Bulanan:</Text> Permudah proses pengelolaan  iuran bulanan. Sistem kami memungkinkan warga untuk melakukan konfirmasi pembayaran iuran bulanan secara online, memastikan transparansi dan kemudahan bagi warga maupun pengurus.
        </ListItem>
      </List>
      <Divider mb="6" />
      <Text mb="6" textAlign="justify">
        Misi kami adalah membuat administrasi RT 08 lebih efisien dan mudah diakses, memberdayakan pemimpin komunitas dan warga. Dengan memanfaatkan teknologi, <Text as="strong" color="teal.500">RT8Connect</Text> bertujuan untuk meningkatkan komunikasi, memperbaiki transparansi, dan memperbaiki pengelolaan komunitas RT secara keseluruhan.
      </Text>

    </Box>
  );
}

export default About;
