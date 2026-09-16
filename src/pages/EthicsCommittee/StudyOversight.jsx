import React, { useMemo, useState } from "react";
import {
  Search,
  Download,
  RefreshCw,
  Eye,
  ChevronRight,
  CalendarClock,
  ClipboardCheck,
  FileText,
  AlertTriangle,
  ShieldAlert,
  Building2,
  History,
  Plus,
  CheckCircle2,
  X,
  MessageSquare,
  Clock3,
} from "lucide-react";

import "../../styles/EthicsCommittee/ethicsCommittee.css";
import "../../styles/EthicsCommittee/studyOversight.css";

const STUDIES = [
  {
    id: "IEC-2026-014",
    title: "Integrative Ayurveda Intervention",
    protocol: "AIIA/DM/2026/014",
    investigator: "Dr. Ananya Sharma",
    site: "AIIA Main Campus",
    status: "Active",
    risk: "Low",
    enrollment: "86 / 120",
    progress: 72,
    nextReview: "10 Dec 2026",
  },
  {
    id: "IEC-2026-013",
    title: "Ayurvedic Lifestyle Programme",
    protocol: "AIIA/MS/2026/013",
    investigator: "Dr. Rohan Mehta",
    site: "AIIA Lifestyle Unit",
    status: "Under Review",
    risk: "Moderate",
    enrollment: "48 / 100",
    progress: 48,
    nextReview: "06 Oct 2026",
  },
  {
    id: "IEC-2026-012",
    title: "AYUSH Formulation AY-17",
    protocol: "AIIA/AY17/2026/012",
    investigator: "Dr. Neha Singh",
    site: "AIIA Clinical Research Centre",
    status: "Meeting Scheduled",
    risk: "Moderate",
    enrollment: "31 / 100",
    progress: 31,
    nextReview: "18 Sep 2026",
  },
  {
    id: "IEC-2026-010",
    title: "Ayurvedic Panchakarma Protocol",
    protocol: "AIIA/PK/2026/010",
    investigator: "Dr. Priya Nair",
    site: "AIIA Panchakarma Unit",
    status: "Conditional Approval",
    risk: "High",
    enrollment: "77 / 120",
    progress: 64,
    nextReview: "22 Nov 2026",
  },
];

const INITIAL_AMENDMENTS = [
  {
    id: "AMD-014-02",
    study: "IEC-2026-014",
    title: "Updated participant information sheet",
    date: "08 Sep 2026",
    status: "Under Review",
  },
  {
    id: "AMD-013-01",
    study: "IEC-2026-013",
    title: "Eligibility criteria clarification",
    date: "03 Sep 2026",
    status: "Approved",
  },
  {
    id: "AMD-010-03",
    study: "IEC-2026-010",
    title: "Follow-up schedule modification",
    date: "20 Aug 2026",
    status: "Revision Requested",
  },
];

const INITIAL_DEVIATIONS = [
  {
    id: "DEV-014-02",
    study: "IEC-2026-014",
    type: "Minor",
    description: "Visit window exceeded by 2 days",
    date: "09 Sep 2026",
    status: "Open",
  },
  {
    id: "DEV-013-01",
    study: "IEC-2026-013",
    type: "Minor",
    description: "Missed questionnaire at scheduled visit",
    date: "01 Sep 2026",
    status: "Under Review",
  },
  {
    id: "DEV-012-03",
    study: "IEC-2026-012",
    type: "Major",
    description: "Protocol procedure documented outside window",
    date: "27 Aug 2026",
    status: "Open",
  },
];

const INITIAL_SAE = [
  {
    id: "SAE-1024",
    study: "IEC-2026-014",
    event: "Liver injury",
    seriousness: "Serious",
    date: "12 Sep 2026",
    status: "Pending IEC Review",
    action: "Review required",
  },
  {
    id: "SAE-1021",
    study: "IEC-2026-013",
    event: "Severe headache",
    seriousness: "Serious",
    date: "09 Sep 2026",
    status: "Under Review",
    action: "Follow-up required",
  },
  {
    id: "SAE-1018",
    study: "IEC-2026-012",
    event: "Cardiac event",
    seriousness: "Serious",
    date: "04 Sep 2026",
    status: "Reviewed",
    action: "Follow-up monitored",
  },
];

const MILESTONES = [
  {
    id: "M-01",
    study: "IEC-2026-014",
    name: "Protocol Approval",
    date: "12 Jan 2026",
    status: "Completed",
  },
  {
    id: "M-02",
    study: "IEC-2026-014",
    name: "First Participant Enrolled",
    date: "04 Feb 2026",
    status: "Completed",
  },
  {
    id: "M-03",
    study: "IEC-2026-014",
    name: "Continuing Review",
    date: "10 Dec 2026",
    status: "Upcoming",
  },
  {
    id: "M-04",
    study: "IEC-2026-013",
    name: "Annual Review",
    date: "06 Oct 2026",
    status: "Upcoming",
  },
  {
    id: "M-05",
    study: "IEC-2026-012",
    name: "IEC Review Meeting",
    date: "18 Sep 2026",
    status: "Upcoming",
  },
];

const statusClass = (status) => {
  const value = status.toLowerCase();

  if (
    value.includes("approved") ||
    value.includes("completed") ||
    value === "active" ||
    value === "closed" ||
    value === "reviewed"
  ) {
    return "success";
  }

  if (
    value.includes("under") ||
    value.includes("upcoming") ||
    value.includes("scheduled") ||
    value.includes("conditional")
  ) {
    return "warning";
  }

  if (
    value.includes("open") ||
    value.includes("pending") ||
    value.includes("revision") ||
    value.includes("high")
  ) {
    return "danger";
  }

  return "neutral";
};

function Badge({ children }) {
  return (
    <span className={`so-badge ${statusClass(children)}`}>
      {children}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="so-modal-backdrop" onMouseDown={onClose}>
      <div className="so-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="so-modal-head">
          <div>
            <span className="so-eyebrow">STUDY OVERSIGHT</span>
            <h2>{title}</h2>
          </div>

          <button className="so-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="so-modal-body">{children}</div>
      </div>
    </div>
  );
}

export default function StudyOversight() {
  const [tab, setTab] = useState("portfolio");
  const [studies] = useState(STUDIES);
  const [amendments, setAmendments] = useState(INITIAL_AMENDMENTS);
  const [deviations, setDeviations] = useState(INITIAL_DEVIATIONS);
  const [saes, setSaes] = useState(INITIAL_SAE);

  const [selected, setSelected] = useState(null);
  const [item, setItem] = useState(null);
  const [modal, setModal] = useState(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);

    clearTimeout(window.__studyOversightToast);

    window.__studyOversightToast = setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const openStudy = (study) => {
    setSelected(study);
    setTab("study-details");
  };

  const filteredStudies = useMemo(() => {
    return studies.filter((study) => {
      const matchesSearch = `${study.id} ${study.title} ${study.protocol} ${study.investigator}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        study.status === filter ||
        study.risk === filter;

      return matchesSearch && matchesFilter;
    });
  }, [studies, query, filter]);

  const updateAmendment = (id, status) => {
    setAmendments((list) =>
      list.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setModal(null);
    notify(`Amendment ${status.toLowerCase()}`);
  };

  const updateDeviation = (id, status) => {
    setDeviations((list) =>
      list.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setModal(null);
    notify(`Deviation ${status.toLowerCase()}`);
  };

  const updateSAE = (id, status) => {
    setSaes((list) =>
      list.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setModal(null);
    notify(`SAE marked ${status}`);
  };

  const exportCSV = () => {
    const csv = [
      "Study ID,Study,Status,Risk,Enrollment,Progress",
      ...studies.map(
        (study) =>
          `${study.id},"${study.title}",${study.status},${study.risk},${study.enrollment},${study.progress}%`
      ),
    ].join("\n");

    const link = document.createElement("a");

    link.href = URL.createObjectURL(
      new Blob([csv], { type: "text/csv" })
    );

    link.download = "study-oversight.csv";
    link.click();

    notify("Study oversight exported");
  };

  const tabs = [
    ["portfolio", "Study Portfolio", ClipboardCheck],
    ["continuing", "Continuing Oversight", Clock3],
    ["amendments", "Amendments & Changes", FileText],
    ["deviations", "Protocol Deviations", AlertTriangle],
    ["safety", "Safety / SAE Review", ShieldAlert],
    ["study-details", "Study Details & Monitoring", Eye],
    ["milestones", "Milestones & Reviews", CalendarClock],
    ["sites", "Site & Investigator Oversight", Building2],
    ["history", "Oversight History", History],
  ];

  return (
    <div className="so-page">

      <nav className="so-subnav">
        {tabs.map(([id, label, Icon]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <main className="so-main">

        {/* STUDY PORTFOLIO */}
        {tab === "portfolio" && (
          <Page
            title="Study Portfolio"
            subtitle="Monitor all studies assigned to the Ethics Committee."
          >
            <div className="so-kpis">

              <Kpi
                label="Active Studies"
                value={studies.filter((s) => s.status === "Active").length}
                click={() => setFilter("Active")}
              />

              <Kpi
                label="High Risk"
                value={studies.filter((s) => s.risk === "High").length}
                click={() => setFilter("High")}
              />

              <Kpi
                label="Open Deviations"
                value={deviations.filter((d) => d.status !== "Closed").length}
                click={() => setTab("deviations")}
              />

              <Kpi
                label="Pending SAE Review"
                value={
                  saes.filter(
                    (s) => s.status === "Pending IEC Review"
                  ).length
                }
                click={() => setTab("safety")}
              />

            </div>

            <Toolbar
              query={query}
              setQuery={setQuery}
              filter={filter}
              setFilter={setFilter}
              reset={() => {
                setQuery("");
                setFilter("All");
              }}
              exportCSV={exportCSV}
            />

            <Table>
              <thead>
                <tr>
                  <th>Study</th>
                  <th>Investigator / Site</th>
                  <th>Enrollment</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudies.map((study) => (
                  <tr key={study.id}>

                    <td>
                      <strong>{study.id}</strong>
                      <span>{study.title}</span>
                      <small>{study.protocol}</small>
                    </td>

                    <td>
                      <strong>{study.investigator}</strong>
                      <span>{study.site}</span>
                    </td>

                    <td>{study.enrollment}</td>

                    <td>
                      <Progress value={study.progress} />
                    </td>

                    <td>
                      <Badge>{study.status}</Badge>
                    </td>

                    <td>
                      <Badge>{study.risk}</Badge>
                    </td>

                    <td>
                      <Action onClick={() => openStudy(study)}>
                        Open
                        <ChevronRight size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* CONTINUING OVERSIGHT */}
        {tab === "continuing" && (
          <Page
            title="Continuing Oversight"
            subtitle="Track periodic reviews and ongoing committee oversight of active studies."
          >
            <div className="so-kpis">

              <Kpi
                label="Reviews Due"
                value="3"
                click={() =>
                  notify("Showing upcoming continuing reviews")
                }
              />

              <Kpi
                label="Active Studies"
                value="2"
                click={() => setTab("portfolio")}
              />

              <Kpi
                label="Reviews Completed"
                value="8"
                click={() =>
                  notify("8 continuing reviews recorded")
                }
              />

              <Kpi
                label="At-Risk Studies"
                value="1"
                click={() => setFilter("High")}
              />

            </div>

            <Table>
              <thead>
                <tr>
                  <th>Study</th>
                  <th>Review Type</th>
                  <th>Last Review</th>
                  <th>Next Review</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {studies.map((study) => (
                  <tr key={study.id}>

                    <td>
                      <strong>{study.id}</strong>
                      <span>{study.title}</span>
                    </td>

                    <td>Continuing / Annual Review</td>
                    <td>10 Sep 2026</td>
                    <td>{study.nextReview}</td>

                    <td>
                      <Badge>{study.risk}</Badge>
                    </td>

                    <td>
                      <Badge>{study.status}</Badge>
                    </td>

                    <td>
                      <Action
                        onClick={() => {
                          setSelected(study);
                          setModal("continuing");
                        }}
                      >
                        Review
                        <Eye size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* AMENDMENTS */}
        {tab === "amendments" && (
          <Page
            title="Amendments & Changes"
            subtitle="Review protocol amendments, study changes and document version changes."
            action={
              <button
                className="so-primary-btn"
                onClick={() => {
                  setItem(null);
                  setModal("new-amendment");
                }}
              >
                <Plus size={16} />
                Add amendment
              </button>
            }
          >
            <Table>
              <thead>
                <tr>
                  <th>Amendment</th>
                  <th>Study</th>
                  <th>Change</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {amendments.map((amendment) => (
                  <tr key={amendment.id}>

                    <td>
                      <strong>{amendment.id}</strong>
                    </td>

                    <td>{amendment.study}</td>
                    <td>{amendment.title}</td>
                    <td>{amendment.date}</td>

                    <td>
                      <Badge>{amendment.status}</Badge>
                    </td>

                    <td>
                      <Action
                        onClick={() => {
                          setItem(amendment);
                          setModal("amendment");
                        }}
                      >
                        Review
                        <ChevronRight size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* DEVIATIONS */}
        {tab === "deviations" && (
          <Page
            title="Protocol Deviations"
            subtitle="Review, document and close protocol deviations requiring committee oversight."
          >
            <Table>
              <thead>
                <tr>
                  <th>Deviation</th>
                  <th>Study</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {deviations.map((deviation) => (
                  <tr key={deviation.id}>

                    <td>
                      <strong>{deviation.id}</strong>
                    </td>

                    <td>{deviation.study}</td>

                    <td>
                      <Badge>{deviation.type}</Badge>
                    </td>

                    <td>{deviation.description}</td>
                    <td>{deviation.date}</td>

                    <td>
                      <Badge>{deviation.status}</Badge>
                    </td>

                    <td>
                      <Action
                        onClick={() => {
                          setItem(deviation);
                          setModal("deviation");
                        }}
                      >
                        Review
                        <ChevronRight size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* SAFETY / SAE */}
        {tab === "safety" && (
          <Page
            title="Safety / SAE Review"
            subtitle="Review serious adverse events linked to studies and record committee follow-up."
          >
            <div className="so-kpis">

              <Kpi
                label="Pending IEC Review"
                value={
                  saes.filter(
                    (s) => s.status === "Pending IEC Review"
                  ).length
                }
              />

              <Kpi
                label="Under Review"
                value={
                  saes.filter(
                    (s) => s.status === "Under Review"
                  ).length
                }
              />

              <Kpi
                label="Reviewed"
                value={
                  saes.filter(
                    (s) => s.status === "Reviewed"
                  ).length
                }
              />

              <Kpi
                label="Serious Cases"
                value={saes.length}
              />

            </div>

            <Table>
              <thead>
                <tr>
                  <th>SAE</th>
                  <th>Study</th>
                  <th>Event</th>
                  <th>Seriousness</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {saes.map((sae) => (
                  <tr key={sae.id}>

                    <td>
                      <strong>{sae.id}</strong>
                      <small>{sae.action}</small>
                    </td>

                    <td>{sae.study}</td>
                    <td>{sae.event}</td>

                    <td>
                      <Badge>{sae.seriousness}</Badge>
                    </td>

                    <td>{sae.date}</td>

                    <td>
                      <Badge>{sae.status}</Badge>
                    </td>

                    <td>
                      <Action
                        onClick={() => {
                          setItem(sae);
                          setModal("sae");
                        }}
                      >
                        Review
                        <ChevronRight size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* STUDY DETAILS */}
        {tab === "study-details" && (
          <Page
            title={
              selected
                ? selected.title
                : "Study Details & Monitoring"
            }
            subtitle={
              selected
                ? `${selected.id} · ${selected.protocol}`
                : "Select a study from the Study Portfolio."
            }
          >
            {!selected ? (
              <Empty onClick={() => setTab("portfolio")} />
            ) : (
              <>
                <div className="so-detail-grid">

                  <Detail
                    title="Study Information"
                    data={[
                      ["Protocol", selected.protocol],
                      ["Investigator", selected.investigator],
                      ["Site", selected.site],
                      ["Risk", selected.risk],
                    ]}
                  />

                  <Detail
                    title="Study Monitoring"
                    data={[
                      ["Enrollment", selected.enrollment],
                      ["Progress", `${selected.progress}%`],
                      ["Status", selected.status],
                      ["Next review", selected.nextReview],
                    ]}
                  />

                  <Detail
                    title="Oversight Actions"
                    data={[
                      [
                        "Open deviations",
                        deviations.filter(
                          (d) =>
                            d.study === selected.id &&
                            d.status !== "Closed"
                        ).length,
                      ],
                      [
                        "Amendments",
                        amendments.filter(
                          (a) => a.study === selected.id
                        ).length,
                      ],
                      [
                        "SAEs",
                        saes.filter(
                          (s) => s.study === selected.id
                        ).length,
                      ],
                      ["Review cycle", "Continuing review"],
                    ]}
                  />

                </div>

                <div className="so-button-grid">

                  <button
                    onClick={() => setTab("continuing")}
                  >
                    <Clock3 />
                    Continuing Oversight
                  </button>

                  <button
                    onClick={() => setTab("amendments")}
                  >
                    <FileText />
                    Amendments
                  </button>

                  <button
                    onClick={() => setTab("deviations")}
                  >
                    <AlertTriangle />
                    Deviations
                  </button>

                  <button
                    onClick={() => setTab("safety")}
                  >
                    <ShieldAlert />
                    Safety / SAE
                  </button>

                  <button
                    onClick={() => setTab("milestones")}
                  >
                    <CalendarClock />
                    Milestones
                  </button>

                  <button
                    onClick={() =>
                      notify("Study monitoring record refreshed")
                    }
                  >
                    <RefreshCw />
                    Refresh record
                  </button>

                </div>
              </>
            )}
          </Page>
        )}

        {/* MILESTONES */}
        {tab === "milestones" && (
          <Page
            title="Milestones & Reviews"
            subtitle="Track study approvals, enrollment milestones and committee review dates."
          >
            <Table>
              <thead>
                <tr>
                  <th>Study</th>
                  <th>Milestone</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {MILESTONES.map((milestone) => (
                  <tr key={milestone.id}>

                    <td>{milestone.study}</td>

                    <td>
                      <strong>{milestone.name}</strong>
                    </td>

                    <td>{milestone.date}</td>

                    <td>
                      <Badge>{milestone.status}</Badge>
                    </td>

                    <td>
                      <Action
                        onClick={() => {
                          setItem(milestone);
                          setModal("milestone");
                        }}
                      >
                        View
                        <Eye size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* SITE & INVESTIGATOR */}
        {tab === "sites" && (
          <Page
            title="Site & Investigator Oversight"
            subtitle="Review site and investigator information connected to monitored studies."
          >
            <Table>
              <thead>
                <tr>
                  <th>Study</th>
                  <th>Investigator</th>
                  <th>Site</th>
                  <th>Enrollment</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {studies.map((study) => (
                  <tr key={study.id}>

                    <td>
                      <strong>{study.id}</strong>
                      <span>{study.title}</span>
                    </td>

                    <td>{study.investigator}</td>
                    <td>{study.site}</td>
                    <td>{study.enrollment}</td>

                    <td>
                      <Badge>{study.risk}</Badge>
                    </td>

                    <td>
                      <Action
                        onClick={() => {
                          setSelected(study);
                          setModal("site");
                        }}
                      >
                        View
                        <Eye size={14} />
                      </Action>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Page>
        )}

        {/* HISTORY */}
        {tab === "history" && (
          <Page
            title="Oversight History"
            subtitle="Recorded committee oversight actions and review activity."
          >
            <div className="so-history">

              {[
                [
                  "15 Sep 2026 · 11:20",
                  "Study portfolio reviewed",
                  "IEC Member",
                ],
                [
                  "12 Sep 2026 · 15:40",
                  "Amendment AMD-014-02 opened",
                  "IEC Member",
                ],
                [
                  "10 Sep 2026 · 10:15",
                  "Continuing review completed",
                  "IEC Chair",
                ],
                [
                  "09 Sep 2026 · 16:05",
                  "Deviation DEV-014-02 recorded",
                  "Study Coordinator",
                ],
                [
                  "04 Sep 2026 · 14:20",
                  "SAE-1018 reviewed",
                  "IEC Member",
                ],
              ].map((entry) => (
                <div
                  className="so-history-item"
                  key={entry[0]}
                >
                  <div className="so-history-dot">
                    <History size={15} />
                  </div>

                  <div>
                    <strong>{entry[1]}</strong>
                    <span>
                      {entry[0]} · {entry[2]}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </Page>
        )}

      </main>

      {/* CONTINUING REVIEW MODAL */}
      {modal === "continuing" && selected && (
        <Modal
          title={`Continuing Review · ${selected.id}`}
          onClose={() => setModal(null)}
        >
          <Info
            data={[
              ["Study", selected.title],
              ["Next review", selected.nextReview],
              ["Risk", selected.risk],
              ["Enrollment", selected.enrollment],
            ]}
          />

          <div className="so-modal-actions">

            <button
              className="so-secondary-btn"
              onClick={() => {
                setModal(null);
                notify("Continuing review marked for follow-up");
              }}
            >
              <MessageSquare size={15} />
              Follow-up
            </button>

            <button
              className="so-primary-btn"
              onClick={() => {
                setModal(null);
                notify("Continuing review completed");
              }}
            >
              <CheckCircle2 size={15} />
              Complete review
            </button>

          </div>
        </Modal>
      )}

      {/* AMENDMENT MODAL */}
      {modal === "amendment" && item && (
        <Modal
          title={`Review ${item.id}`}
          onClose={() => setModal(null)}
        >
          <Info
            data={[
              ["Study", item.study],
              ["Change", item.title],
              ["Submitted", item.date],
              ["Status", item.status],
            ]}
          />

          <div className="so-modal-actions">

            <button
              className="so-secondary-btn"
              onClick={() =>
                updateAmendment(
                  item.id,
                  "Revision Requested"
                )
              }
            >
              <MessageSquare size={15} />
              Request revision
            </button>

            <button
              className="so-primary-btn"
              onClick={() =>
                updateAmendment(item.id, "Approved")
              }
            >
              <CheckCircle2 size={15} />
              Approve
            </button>

          </div>
        </Modal>
      )}

      {/* DEVIATION MODAL */}
      {modal === "deviation" && item && (
        <Modal
          title={`Review ${item.id}`}
          onClose={() => setModal(null)}
        >
          <Info
            data={[
              ["Study", item.study],
              ["Type", item.type],
              ["Description", item.description],
              ["Date", item.date],
              ["Status", item.status],
            ]}
          />

          <div className="so-modal-actions">

            <button
              className="so-secondary-btn"
              onClick={() =>
                updateDeviation(
                  item.id,
                  "Under Review"
                )
              }
            >
              <Clock3 size={15} />
              Under review
            </button>

            <button
              className="so-primary-btn"
              onClick={() =>
                updateDeviation(item.id, "Closed")
              }
            >
              <CheckCircle2 size={15} />
              Close deviation
            </button>

          </div>
        </Modal>
      )}

      {/* SAE MODAL */}
      {modal === "sae" && item && (
        <Modal
          title={`SAE Review · ${item.id}`}
          onClose={() => setModal(null)}
        >
          <Info
            data={[
              ["Study", item.study],
              ["Event", item.event],
              ["Seriousness", item.seriousness],
              ["Reported", item.date],
              ["Status", item.status],
            ]}
          />

          <div className="so-modal-actions">

            <button
              className="so-secondary-btn"
              onClick={() =>
                updateSAE(
                  item.id,
                  "Under Review"
                )
              }
            >
              <Clock3 size={15} />
              Start review
            </button>

            <button
              className="so-primary-btn"
              onClick={() =>
                updateSAE(item.id, "Reviewed")
              }
            >
              <CheckCircle2 size={15} />
              Mark reviewed
            </button>

          </div>
        </Modal>
      )}

      {/* MILESTONE MODAL */}
      {modal === "milestone" && item && (
        <Modal
          title={item.name}
          onClose={() => setModal(null)}
        >
          <Info
            data={[
              ["Study", item.study],
              ["Date", item.date],
              ["Status", item.status],
            ]}
          />

          <button
            className="so-primary-btn"
            onClick={() => {
              setModal(null);
              notify("Milestone marked completed");
            }}
          >
            <CheckCircle2 size={15} />
            Mark completed
          </button>
        </Modal>
      )}

      {/* SITE MODAL */}
      {modal === "site" && selected && (
        <Modal
          title={`${selected.site} · Site Oversight`}
          onClose={() => setModal(null)}
        >
          <Info
            data={[
              ["Investigator", selected.investigator],
              ["Study", selected.title],
              ["Enrollment", selected.enrollment],
              ["Risk", selected.risk],
            ]}
          />

          <button
            className="so-primary-btn"
            onClick={() => {
              setModal(null);
              notify("Site monitoring record opened");
            }}
          >
            <Eye size={15} />
            Open monitoring record
          </button>
        </Modal>
      )}

      {/* ADD AMENDMENT */}
      {modal === "new-amendment" && (
        <Modal
          title="Add Amendment Record"
          onClose={() => setModal(null)}
        >
          <div className="so-form">

            <label>
              Study

              <select defaultValue={studies[0].id}>
                {studies.map((study) => (
                  <option key={study.id}>
                    {study.id}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Change description

              <textarea defaultValue="New protocol or document change submitted for IEC review." />
            </label>

          </div>

          <div className="so-modal-actions">

            <button
              className="so-secondary-btn"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>

            <button
              className="so-primary-btn"
              onClick={() => {
                setAmendments((list) => [
                  {
                    id: `AMD-NEW-${list.length + 1}`,
                    study: studies[0].id,
                    title:
                      "New amendment submitted for IEC review",
                    date: "15 Sep 2026",
                    status: "Under Review",
                  },
                  ...list,
                ]);

                setModal(null);
                notify("Amendment record added");
              }}
            >
              <CheckCircle2 size={15} />
              Save amendment
            </button>

          </div>
        </Modal>
      )}

      {toast && (
        <div className="so-toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}

    </div>
  );
}

function Page({
  title,
  subtitle,
  action,
  children,
}) {
  return (
    <>
      <div className="so-page-title">

        <div>
          <span className="so-eyebrow">
            ETHICS COMMITTEE · STUDY OVERSIGHT
          </span>

          <h1>{title}</h1>

          <p>{subtitle}</p>
        </div>

        {action}

      </div>

      {children}
    </>
  );
}

function Kpi({ label, value, click }) {
  return (
    <button
      className="so-kpi-card"
      onClick={click}
    >
      <span>{label}</span>

      <strong>{value}</strong>

      <small>
        Open related records
        <ChevronRight size={14} />
      </small>
    </button>
  );
}

function Toolbar({
  query,
  setQuery,
  filter,
  setFilter,
  reset,
  exportCSV,
}) {
  return (
    <div className="so-toolbar">

      <label className="so-search">
        <Search size={17} />

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search study, protocol or investigator"
        />
      </label>

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
        <option>All</option>
        <option>Active</option>
        <option>Under Review</option>
        <option>Meeting Scheduled</option>
        <option>Conditional Approval</option>
        <option>Low</option>
        <option>Moderate</option>
        <option>High</option>
      </select>

      <button
        className="so-secondary-btn"
        onClick={reset}
      >
        <RefreshCw size={15} />
        Reset
      </button>

      <button
        className="so-secondary-btn"
        onClick={exportCSV}
      >
        <Download size={15} />
        Export
      </button>

    </div>
  );
}

function Table({ children }) {
  return (
    <section className="so-card">
      <div className="so-table-wrap">
        <table className="so-table">
          {children}
        </table>
      </div>
    </section>
  );
}

function Action({ children, onClick }) {
  return (
    <button
      className="so-view-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Progress({ value }) {
  return (
    <div className="so-progress">

      <div>
        <span
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <b>{value}%</b>

    </div>
  );
}

function Detail({ title, data }) {
  return (
    <section className="so-card">

      <div className="so-card-head">
        <h2>{title}</h2>
      </div>

      <div className="so-detail-list">

        {data.map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>
            <strong>{value}</strong>
          </div>
        ))}

      </div>

    </section>
  );
}

function Info({ data }) {
  return (
    <div className="so-modal-info">

      {data.map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}

    </div>
  );
}

function Empty({ onClick }) {
  return (
    <section className="so-empty">

      <Eye size={35} />

      <h2>No study selected</h2>

      <p>
        Open a study from the Study Portfolio first.
      </p>

      <button
        className="so-primary-btn"
        onClick={onClick}
      >
        Open Study Portfolio
      </button>

    </section>
  );
}