'use client';

import { useState } from 'react';
import { Download, CheckCircle2, FileText, Check } from 'lucide-react';

export function DownloadChecklistButton({ className }: { className?: string }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const checklistContent = `================================================================================
DIRECT2CAMPUS | IEM KOLKATA B.TECH ADMISSION 2027
DOCUMENT VERIFICATION & APPLICATION PREPARATION CHECKLIST
================================================================================

This document checklist is prepared for candidates applying for B.Tech programmes
at the Institute of Engineering & Management (IEM), Kolkata for the 2027 intake.

--------------------------------------------------------------------------------
1. MANDATORY ACADEMIC DOCUMENTS
--------------------------------------------------------------------------------
[ ] Class 10 Board Marksheet (Self-attested photocopy + Original for verification)
[ ] Class 10 Board Pass Certificate / Admit Card (for proof of Date of Birth)
[ ] Class 12 Qualifying Examination Marksheet (or Appearing Admit Card for 2027 batch)
[ ] Class 12 Pass Certificate (if already passed)
[ ] Transfer Certificate (TC) / School Leaving Certificate (SLC) from last attended school
[ ] Migration Certificate (for CBSE, CISCE, and non-West Bengal state boards)
[ ] Character / Conduct Certificate issued by the Head of the Institution last attended

--------------------------------------------------------------------------------
2. ENTRANCE EXAMINATION DOCUMENTS (AS APPLICABLE)
--------------------------------------------------------------------------------
[ ] IEMJEE 2027 Admit Card & Scorecard / Rank Letter (Official portal: exam.iem.edu.in)
[ ] WBJEE 2027 Rank Card (if applying through WBJEE quota)
[ ] JEE Main 2027 Scorecard / Session Result (if applying through All-India quota)
[ ] Provisional Seat Allotment Letter (issued during counselling)

--------------------------------------------------------------------------------
3. IDENTITY & RESIDENCE PROOFS
--------------------------------------------------------------------------------
[ ] Aadhaar Card of Candidate (Photocopy + Original for verification)
[ ] Domicile Certificate (issued by competent authority as per institutional guidelines)
[ ] Category Certificate (SC / ST / OBC-A / OBC-B / PwD / EWS) if claiming reservation
[ ] Parents / Guardian's Identity Proof & PAN Card

--------------------------------------------------------------------------------
4. PHOTOGRAPHS & SIGNATURES
--------------------------------------------------------------------------------
[ ] 8 Copies of Recent Passport Size Colour Photographs (matching admit card)
[ ] 2 Copies of Stamp Size Photographs
[ ] Candidate's & Parent's Specimen Signatures on prescribed institutional forms

--------------------------------------------------------------------------------
5. MEDICAL & ANTI-RAGGING AFFIDAVITS
--------------------------------------------------------------------------------
[ ] Medical Fitness Certificate from a Registered Medical Practitioner (MBBS)
[ ] Eye Examination / Vision Report
[ ] Anti-Ragging Undertaking by Student (via antiragging.in reference)
[ ] Anti-Ragging Undertaking by Parent / Guardian

--------------------------------------------------------------------------------
IMPORTANT ADVISORY FOR CANDIDATES:
--------------------------------------------------------------------------------
1. Institutional Fee Payments: All tuition fees, registration fees, and hostel fees
   must be paid ONLY via official IEM institutional payment portals (demand draft,
   net banking, or authorised college gateway). NEVER pay admission fees in cash
   or to personal accounts.
2. Official IEM Portal: https://exam.iem.edu.in/ | https://iem.edu.in/
3. Admission Guidance Support: Direct2Campus Education Portal (+91 62003 25137)
================================================================================`;

    const blob = new Blob([checklistContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IEM-Kolkata-BTech-Admission-Checklist-2027.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={className || "px-6 py-3.5 rounded-xl bg-white border border-gray-200 hover:border-d2c-royal hover:bg-blue-50/50 text-d2c-navy font-bold text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"}
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700">Checklist Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-d2c-royal group-hover:translate-y-0.5 transition-transform" />
          <span>DOWNLOAD ADMISSION CHECKLIST</span>
        </>
      )}
    </button>
  );
}
