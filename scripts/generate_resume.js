// ============================================================
// Script to generate a clean, valid PDF resume for Damin Sahu
// Run: node scripts/generate_resume.js
// Output: public/resume.pdf
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../public/resume.pdf');

function buildCleanResumePDF() {
  const content = [
    'BT',
    // Header
    '/F2 22 Tf',
    '50 745 Td',
    '(DAMIN SAHU) Tj',
    '/F1 10.5 Tf',
    '0 -18 Td',
    '(B.Tech Computer Science and Engineering | Jaipur, Rajasthan, India) Tj',
    '0 -14 Td',
    '(Email: contact@daminsahu.dev  |  Portfolio: daminsahu.dev  |  Location: Jaipur, India) Tj',
    '0 -24 Td',

    // Section 1: Education
    '/F2 12.5 Tf',
    '(EDUCATION) Tj',
    '/F2 10 Tf',
    '0 -16 Td',
    '(B.Tech in Computer Science and Engineering) Tj',
    '/F1 9.5 Tf',
    '0 -13 Td',
    '(NXTWAVE of Innovation in Advance Technology  |  Status: Currently Pursuing) Tj',
    '0 -12 Td',
    '(Academic Focus: DSA, OOP, DBMS, Web Development, OS, AI & Emerging Tech) Tj',
    '0 -22 Td',

    // Section 2: Technical Skills
    '/F2 12.5 Tf',
    '(TECHNICAL SKILLS) Tj',
    '/F1 9.5 Tf',
    '0 -15 Td',
    '(Programming Languages: Python, JavaScript, TypeScript, C++, SQL) Tj',
    '0 -13 Td',
    '(Frontend & Web: React, Node.js, HTML5, CSS3, Modern Responsive UI/UX, REST APIs) Tj',
    '0 -13 Td',
    '(Hardware & IoT: ESP32, Ultrasonic Sensors, Arduino IDE, Firebase, Telemetry) Tj',
    '0 -13 Td',
    '(Developer Tools: Git, GitHub, VS Code, Linux/PowerShell, MinIO, PostgreSQL) Tj',
    '0 -22 Td',

    // Section 3: Projects
    '/F2 12.5 Tf',
    '(FEATURED PROJECTS) Tj',
    '/F2 10 Tf',
    '0 -15 Td',
    '(1. SecureChain DMS — Secure Document Management System) Tj',
    '/F1 9.5 Tf',
    '0 -12 Td',
    '(- Implemented cryptographic SHA-256 fingerprinting, role-based access control, and audit logs.) Tj',
    '0 -12 Td',
    '(- Designed an approval-based revision workflow guaranteeing tamper-evident document integrity.) Tj',
    '/F2 10 Tf',
    '0 -16 Td',
    '(2. IoT Smart Waste Management System) Tj',
    '/F1 9.5 Tf',
    '0 -12 Td',
    '(- Engineered an IoT system utilizing ESP32 microcontrollers and ultrasonic fill-level sensors.) Tj',
    '0 -12 Td',
    '(- Synchronized real-time telemetry to Firebase and structured intelligent collection routes.) Tj',
    '/F2 10 Tf',
    '0 -16 Td',
    '(3. UIDAI Hackathon Digital Identity Innovation) Tj',
    '/F1 9.5 Tf',
    '0 -12 Td',
    '(- Collaborated with Team TatvX on identity verification workflows and edge security.) Tj',
    '0 -22 Td',

    // Section 4: Achievements & Milestones
    '/F2 12.5 Tf',
    '(ACHIEVEMENTS & MILESTONES) Tj',
    '/F1 9.5 Tf',
    '0 -15 Td',
    '(- First Place Winner, Badminton Competition, NXTWAVE of Innovation in Advance Technology Sports Event.) Tj',
    '0 -13 Td',
    '(- Active Participant in UIDAI Hackathon 2026 solving identity technology challenges.) Tj',
    '0 -13 Td',
    '(- Active builder in software development, algorithm problem-solving, and IoT engineering.) Tj',
    'ET'
  ].join('\n');

  const streamLen = Buffer.byteLength(content);

  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>';
  objects[4] = `<< /Length ${streamLen} >>\nstream\n${content}\nendstream`;
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[6] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(pdf);
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

const pdfData = buildCleanResumePDF();
fs.writeFileSync(outputPath, pdfData);
console.log(`✓ Resume PDF generated at: ${outputPath} (${Buffer.byteLength(pdfData)} bytes)`);
