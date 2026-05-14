export type SpecialtyCategory =
  | "surgical"
  | "cardio"
  | "neuro"
  | "womens"
  | "diagnostic"
  | "other"

export type Specialty = {
  name: string
  cats: SpecialtyCategory[]
  procs: string[]
}

export const SPECIALTIES: Specialty[] = [
  { name: "Maxillofacial Surgery",      cats: ["surgical"],            procs: ["Rhinoplasty", "Osteosynthesis of facial bone fractures", "Removal of maxillofacial cysts and tumours"] },
  { name: "Plastic & Microsurgery",     cats: ["surgical"],            procs: ["Blepharoplasty", "Liposuction & abdominoplasty", "Face and neck lifting"] },
  { name: "General Surgery",            cats: ["surgical"],            procs: ["Laparoscopic cholecystectomy", "Appendectomy", "Hernia repair"] },
  { name: "Laparoscopic Surgery",       cats: ["surgical"],            procs: ["Gallbladder surgery", "Laparoscopic hernia procedures", "Intestinal laparoscopic surgery"] },
  { name: "Vascular Surgery",           cats: ["surgical", "cardio"],  procs: ["Varicose vein surgery", "Carotid endarterectomy", "Peripheral arterial surgery"] },
  { name: "Cardiac Surgery",            cats: ["cardio", "surgical"],  procs: ["Coronary artery bypass grafting (CABG)", "Valve replacement surgery", "Aortic surgery"] },
  { name: "Interventional Cardiology",  cats: ["cardio"],              procs: ["Coronary angiography", "Coronary artery stenting", "Angioplasty"] },
  { name: "Cardiology & Arrhythmology", cats: ["cardio"],              procs: ["Pacemaker implantation", "Radiofrequency ablation", "Holter monitoring & arrhythmia diagnostics"] },
  { name: "Neurosurgery",               cats: ["neuro", "surgical"],   procs: ["Brain tumour removal", "Spinal disc surgery", "Craniotomies"] },
  { name: "Vascular Neurosurgery",      cats: ["neuro", "surgical"],   procs: ["Aneurysm clipping", "Endovascular interventions", "Surgery for vascular malformations"] },
  { name: "Traumatology & Orthopedics", cats: ["surgical"],            procs: ["Hip replacement", "Knee arthroscopy", "Fracture osteosynthesis"] },
  { name: "Urology",                    cats: ["surgical"],            procs: ["TURP procedures", "Laser stone fragmentation", "Endoscopic urinary tract surgery"] },
  { name: "Coloproctology",             cats: ["surgical"],            procs: ["Hemorrhoidectomy", "Rectal fistula surgery", "Intestinal tumour resections"] },
  { name: "Endocrine Surgery",          cats: ["surgical"],            procs: ["Thyroidectomy", "Thyroid nodule removal", "Parathyroidectomy"] },
  { name: "ENT Surgery",                cats: ["surgical"],            procs: ["Septoplasty", "Endoscopic FESS surgery", "Tonsillectomy"] },
  { name: "Ophthalmology",              cats: ["surgical"],            procs: ["Cataract surgery", "Laser vision correction", "Vitreoretinal surgery"] },
  { name: "Gynecology & Oncogynecology",cats: ["womens", "surgical"],  procs: ["Hysterectomy", "Laparoscopic ovarian surgery", "Oncogynecological procedures"] },
  { name: "Obstetrics",                 cats: ["womens"],              procs: ["Cesarean section", "Natural childbirth observation", "Surgery for complicated pregnancies"] },
  { name: "Oncology",                   cats: ["other"],               procs: ["Tumour removal surgery", "Chemotherapy procedures", "Biopsies & port-system procedures"] },
  { name: "Thoracic Surgery",           cats: ["surgical"],            procs: ["Lung surgery", "Thoracoscopic interventions", "Mediastinal tumour resections"] },
  { name: "Reproductive Medicine",      cats: ["womens"],              procs: ["IVF / ICSI", "Embryo transfer", "Follicular puncture"] },
  { name: "Cosmetic Medicine",          cats: ["other"],               procs: ["Botox & fillers", "Laser rejuvenation", "Facial contouring"] },
  { name: "Hemodialysis",               cats: ["other"],               procs: ["Hemodialysis", "Vascular access procedures", "Chronic kidney disease monitoring"] },
  { name: "Diagnostic Department",      cats: ["diagnostic"],          procs: ["MRI / CT imaging", "Endoscopy", "Ultrasound & functional diagnostics"] },
]

export const CATEGORY_LABEL: Record<SpecialtyCategory, string> = {
  surgical:   "Surgical",
  cardio:     "Cardiac & Vascular",
  neuro:      "Neuro",
  womens:     "Women's Health",
  diagnostic: "Diagnostic",
  other:      "Clinical",
}
