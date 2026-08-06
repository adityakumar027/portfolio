from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Aditya_Kumar_Resume.pdf"
PUBLIC = ROOT / "public" / "Aditya_Kumar_Resume.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#111512")
MUTED = colors.HexColor("#59605B")
ACCENT = colors.HexColor("#087A64")
RULE = colors.HexColor("#CBD0CC")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", fontName="Helvetica-Bold", fontSize=23, leading=25, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="Role", fontName="Helvetica", fontSize=9.2, leading=12, textColor=ACCENT, tracking=0.6))
styles.add(ParagraphStyle(name="Contact", fontName="Helvetica", fontSize=7.7, leading=10, textColor=MUTED, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name="Summary", fontName="Helvetica", fontSize=8.8, leading=11.8, textColor=INK))
styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=8.5, leading=10.5, textColor=ACCENT, spaceBefore=6, spaceAfter=3.5, tracking=1.2))
styles.add(ParagraphStyle(name="ItemTitle", fontName="Helvetica-Bold", fontSize=9.1, leading=11, textColor=INK))
styles.add(ParagraphStyle(name="ItemMeta", fontName="Helvetica", fontSize=7.8, leading=10, textColor=MUTED, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=8.1, leading=10.6, textColor=INK))
styles.add(ParagraphStyle(name="ResumeBullet", fontName="Helvetica", fontSize=7.9, leading=10.25, leftIndent=10, firstLineIndent=-7, textColor=INK, bulletIndent=0, spaceAfter=1.5))
styles.add(ParagraphStyle(name="Small", fontName="Helvetica", fontSize=7.75, leading=10.1, textColor=INK))


def header_row(title: str, meta: str):
    table = Table(
        [[Paragraph(title, styles["ItemTitle"]), Paragraph(meta, styles["ItemMeta"]) ]],
        colWidths=[117 * mm, 42 * mm],
    )
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def section(title: str):
    return [
        Paragraph(title.upper(), styles["Section"]),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceAfter=4),
    ]


def bullet(text: str):
    return Paragraph(f"- {text}", styles["ResumeBullet"])


story = []

header = Table(
    [[
        [Paragraph("ADITYA KUMAR", styles["Name"]), Paragraph("SOFTWARE ENGINEER · AI SYSTEMS & BACKEND INFRASTRUCTURE", styles["Role"])],
        Paragraph(
            "+91 8299232511 · <link href='mailto:adi.workspace76865@gmail.com'>adi.workspace76865@gmail.com</link><br/>"
            "<link href='https://github.com/adityakumar027'>github.com/adityakumar027</link> · "
            "<link href='https://www.linkedin.com/in/adicrzz/'>linkedin.com/in/adicrzz</link>",
            styles["Contact"],
        ),
    ]],
    colWidths=[100 * mm, 59 * mm],
)
header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story.extend([header, Spacer(1, 4), HRFlowable(width="100%", thickness=1.2, color=INK, spaceAfter=5)])
story.append(Paragraph(
    "Software engineer focused on production AI, backend systems, and automation. Built self-healing workflows that auto-resolve 60%+ of failures, reduced incident response time by 70%, and shipped measurable performance improvements across distributed systems.",
    styles["Summary"],
))

story.extend(section("Experience"))
story.append(KeepTogether([
    header_row("Curefit · House of Cult - Software Engineering Intern", "May 2026 - Present"),
    bullet("Built agent-driven root-cause analysis and self-healing workflows across campaign, segmentation, and notification services, automatically resolving 60%+ of delivery failures."),
    bullet("Reduced incident response time by 70% by integrating Coralogix, AWS SQS, Sentry, and Metabase into automated monitoring and remediation pipelines."),
    bullet("Designed auditable, human-in-the-loop operations workflows targeting an 85% reduction in manual policy review using Java, Python, REST APIs, MySQL, and Kubernetes."),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    header_row("WorldQuant BRAIN - Quantitative Research Consultant · Expert", "May 2025 - Apr 2026"),
    bullet("Developed and backtested quantitative alpha models that improved strategy performance by 20%."),
    bullet("Submitted 150+ models; 12+ passed all checks, including Sharpe above 2.25 and turnover below 30%."),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    header_row("Jortke - Software Engineering Intern", "Mar 2024 - May 2024"),
    bullet("Reduced high-traffic endpoint latency by 15-20% through Redis caching and queuing; improved average response time from 220 ms to 150 ms."),
    bullet("Built and maintained 10+ REST APIs, reducing database queries by 30%."),
]))

story.extend(section("Selected Projects"))
story.append(KeepTogether([
    header_row("Automated Job Application System", "React · Node.js · MongoDB"),
    bullet("Built a full-stack Chrome extension that parses unstructured resume PDFs into editable profiles and autofills job applications, with asynchronous extraction and JWT-authenticated APIs."),
]))
story.append(Spacer(1, 2))
story.append(KeepTogether([
    header_row("Graph Node Classification with GCN", "Python · TensorFlow · Keras"),
    bullet("Improved node classification accuracy by 15% using two-hop neighborhood aggregation and weighted loss on the imbalanced CORA citation dataset."),
]))
story.append(Spacer(1, 2))
story.append(KeepTogether([
    header_row("PyOS - Modular Operating System Simulation", "Python · CLI · Multithreading"),
    bullet("Built a terminal OS simulation with password-hashed authentication, concurrent command execution, process scheduling, and a shell that accepts new commands in under 10 lines."),
]))

story.extend(section("Education & Skills"))
story.append(header_row("Indian Institute of Information Technology, Gwalior", "Nov 2022 - Jun 2027"))
story.append(Paragraph("Integrated B.Tech in Information Technology + MBA · CGPA 7.97/10", styles["Small"]))
story.append(Spacer(1, 3))
story.append(Paragraph(
    "<b>Languages:</b> Java, Python, JavaScript, C++, SQL &nbsp;&nbsp; <b>Backend:</b> Node.js, Express, REST APIs, microservices, JWT &nbsp;&nbsp; "
    "<b>AI:</b> AI agents, RAG, LangGraph, TensorFlow, prompt engineering &nbsp;&nbsp; <b>Infrastructure:</b> Kubernetes, AWS SQS, Redis, Jenkins, Coralogix, Sentry &nbsp;&nbsp; "
    "<b>Data:</b> MySQL, MongoDB, Pandas",
    styles["Small"],
))

story.extend(section("Selected Achievements"))
story.append(Paragraph(
    "LeetCode Knight (1820) · CodeChef 3 Star (1661) · Codeforces Pupil (1300+) · 1,000+ algorithmic problems solved · Global Rank 180 in CodeChef Starters 143 Div. 2 · Google Big Code 2026 semi-finalist",
    styles["Small"],
))

doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=14 * mm,
    bottomMargin=12 * mm,
    title="Aditya Kumar - Software Engineer Resume",
    author="Aditya Kumar",
    subject="Software engineering resume",
)
doc.build(story)
copyfile(OUTPUT, PUBLIC)
print(OUTPUT)
