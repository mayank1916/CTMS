import React, { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  ShieldCheck,
  Search,
  Filter,
  RotateCcw,
  MoreVertical,
  Edit3,
  Eye,
  Mail,
  Phone,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ClipboardCheck,
  FileText,
  Award,
  Building2,
  KeyRound,
  Download,
  Plus,
  X,
  Save,
  ChevronRight,
  BriefcaseBusiness,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

import "../../styles/EthicsCommittee/iecAdministration.css";

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialMembers = [
  {
    id: "IEC-M001",
    name: "Dr. Ananya Sharma",
    role: "Chairperson",
    category: "Medical",
    department: "Clinical Research",
    organization: "AIIA",
    email: "ananya.sharma@aiia.gov.in",
    phone: "+91 98765 43210",
    status: "Active",
    joined: "12 Jan 2024",
    term: "2024 - 2027",
    training: "Completed",
    lastTraining: "18 Aug 2026",
    workload: 4,
  },
  {
    id: "IEC-M002",
    name: "Dr. Rajiv Mehta",
    role: "Member Secretary",
    category: "Research",
    department: "Clinical Trials",
    organization: "AIIA",
    email: "rajiv.mehta@aiia.gov.in",
    phone: "+91 98765 43112",
    status: "Active",
    joined: "08 Feb 2024",
    term: "2024 - 2027",
    training: "Completed",
    lastTraining: "11 Jul 2026",
    workload: 7,
  },
  {
    id: "IEC-M003",
    name: "Prof. Kavita Rao",
    role: "Medical Member",
    category: "Medical",
    department: "Ayurveda Medicine",
    organization: "AIIA",
    email: "kavita.rao@aiia.gov.in",
    phone: "+91 98765 43045",
    status: "Active",
    joined: "21 Mar 2024",
    term: "2024 - 2027",
    training: "Completed",
    lastTraining: "05 Aug 2026",
    workload: 5,
  },
  {
    id: "IEC-M004",
    name: "Dr. Vikram Singh",
    role: "Pharmacologist",
    category: "Scientific",
    department: "Pharmacology",
    organization: "AIIA",
    email: "vikram.singh@aiia.gov.in",
    phone: "+91 98765 43981",
    status: "Active",
    joined: "02 Apr 2024",
    term: "2024 - 2027",
    training: "Due",
    lastTraining: "14 Sep 2025",
    workload: 3,
  },
  {
    id: "IEC-M005",
    name: "Ms. Neha Verma",
    role: "Legal Expert",
    category: "Legal",
    department: "Legal Affairs",
    organization: "AIIA",
    email: "neha.verma@aiia.gov.in",
    phone: "+91 98765 43872",
    status: "Active",
    joined: "19 Apr 2024",
    term: "2024 - 2027",
    training: "Completed",
    lastTraining: "22 Jun 2026",
    workload: 2,
  },
  {
    id: "IEC-M006",
    name: "Mr. Arjun Kapoor",
    role: "Lay Person",
    category: "Community",
    department: "External Member",
    organization: "External",
    email: "arjun.kapoor@example.org",
    phone: "+91 98765 43761",
    status: "Active",
    joined: "06 May 2024",
    term: "2024 - 2027",
    training: "Completed",
    lastTraining: "30 Jul 2026",
    workload: 2,
  },
  {
    id: "IEC-M007",
    name: "Dr. Priya Nair",
    role: "Medical Member",
    category: "Medical",
    department: "Pediatrics",
    organization: "AIIA",
    email: "priya.nair@aiia.gov.in",
    phone: "+91 98765 43652",
    status: "On Leave",
    joined: "15 Jun 2024",
    term: "2024 - 2027",
    training: "Completed",
    lastTraining: "02 Aug 2026",
    workload: 0,
  },
  {
    id: "IEC-M008",
    name: "Mr. Suresh Iyer",
    role: "Community Representative",
    category: "Community",
    department: "External Member",
    organization: "External",
    email: "suresh.iyer@example.org",
    phone: "+91 98765 43543",
    status: "Inactive",
    joined: "11 Jul 2023",
    term: "2023 - 2026",
    training: "Expired",
    lastTraining: "10 Jul 2025",
    workload: 0,
  },
];

const initialTraining = [
  {
    id: "TR-001",
    member: "Dr. Ananya Sharma",
    topic: "GCP & Ethics Refresher",
    type: "Annual",
    date: "18 Aug 2026",
    expiry: "18 Aug 2027",
    status: "Valid",
  },
  {
    id: "TR-002",
    member: "Dr. Rajiv Mehta",
    topic: "Human Participant Protection",
    type: "Mandatory",
    date: "11 Jul 2026",
    expiry: "11 Jul 2027",
    status: "Valid",
  },
  {
    id: "TR-003",
    member: "Prof. Kavita Rao",
    topic: "GCP & Ethics Refresher",
    type: "Annual",
    date: "05 Aug 2026",
    expiry: "05 Aug 2027",
    status: "Valid",
  },
  {
    id: "TR-004",
    member: "Dr. Vikram Singh",
    topic: "GCP & Ethics Refresher",
    type: "Annual",
    date: "14 Sep 2025",
    expiry: "14 Sep 2026",
    status: "Expiring",
  },
  {
    id: "TR-005",
    member: "Ms. Neha Verma",
    topic: "Research Ethics",
    type: "Mandatory",
    date: "22 Jun 2026",
    expiry: "22 Jun 2027",
    status: "Valid",
  },
];

const meetings = [
  {
    id: "MT-021",
    date: "22 Sep 2026",
    time: "10:00 AM",
    title: "Monthly IEC Meeting",
    agenda: "8 Items",
    status: "Scheduled",
    attendance: "Pending",
  },
  {
    id: "MT-020",
    date: "25 Aug 2026",
    time: "10:00 AM",
    title: "Monthly IEC Meeting",
    agenda: "11 Items",
    status: "Completed",
    attendance: "7 / 8",
  },
  {
    id: "MT-019",
    date: "28 Jul 2026",
    time: "11:00 AM",
    title: "Special Review Meeting",
    agenda: "5 Items",
    status: "Completed",
    attendance: "8 / 8",
  },
];

const activityLog = [
  {
    id: 1,
    action: "Member profile updated",
    actor: "Dr. Rajiv Mehta",
    target: "Dr. Vikram Singh",
    time: "Today, 11:42 AM",
    type: "member",
  },
  {
    id: 2,
    action: "Training certificate uploaded",
    actor: "IEC Secretariat",
    target: "Dr. Ananya Sharma",
    time: "Today, 10:18 AM",
    type: "training",
  },
  {
    id: 3,
    action: "Meeting attendance recorded",
    actor: "IEC Secretariat",
    target: "MT-020",
    time: "Yesterday, 04:35 PM",
    type: "meeting",
  },
  {
    id: 4,
    action: "Member status changed",
    actor: "Dr. Rajiv Mehta",
    target: "Mr. Suresh Iyer",
    time: "12 Sep 2026",
    type: "status",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getStatusClass = (status) => {
  const value = status.toLowerCase().replace(/\s+/g, "-");

  if (["active", "valid", "completed"].includes(value)) {
    return "ia-status ia-status-success";
  }

  if (["due", "expiring", "scheduled", "on-leave"].includes(value)) {
    return "ia-status ia-status-warning";
  }

  return "ia-status ia-status-danger";
};

const getTrainingClass = (status) => {
  if (status === "Valid") return "ia-training valid";
  if (status === "Expiring") return "ia-training expiring";
  return "ia-training expired";
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({ icon: Icon, label, value, detail, type }) => (
  <div className={`ia-stat-card ia-stat-${type}`}>
    <div className="ia-stat-icon">
      <Icon size={21} />
    </div>

    <div className="ia-stat-content">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  </div>
);

/* =========================================================
   MEMBER FORM
========================================================= */

const emptyMember = {
  name: "",
  role: "",
  category: "Medical",
  department: "",
  organization: "AIIA",
  email: "",
  phone: "",
  status: "Active",
  joined: "",
  term: "2026 - 2029",
  training: "Due",
  lastTraining: "Not completed",
  workload: 0,
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const IECAdministration = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const [members, setMembers] = useState(initialMembers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState(emptyMember);

  const [toast, setToast] = useState("");

  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingMember, setTrainingMember] = useState("");

  /* ---------------------------------------------------------
     STATS
  --------------------------------------------------------- */

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "Inactive"
  ).length;

  const leaveMembers = members.filter(
    (member) => member.status === "On Leave"
  ).length;

  const trainingDue = members.filter(
    (member) => member.training !== "Completed"
  ).length;

  /* ---------------------------------------------------------
     FILTER MEMBERS
  --------------------------------------------------------- */

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(searchText) ||
        member.id.toLowerCase().includes(searchText) ||
        member.role.toLowerCase().includes(searchText) ||
        member.department.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || member.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [members, search, statusFilter, categoryFilter]);

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  /* ---------------------------------------------------------
     FORM HANDLERS
  --------------------------------------------------------- */

  const handleFormChange = (field, value) => {
    setMemberForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openAddMember = () => {
    setEditingMember(null);
    setMemberForm(emptyMember);
    setShowMemberForm(true);
  };

  const openEditMember = (member) => {
    setEditingMember(member);
    setMemberForm({
      ...member,
    });
    setShowMemberForm(true);
  };

  const handleSaveMember = (event) => {
    event.preventDefault();

    if (!memberForm.name || !memberForm.role || !memberForm.email) {
      showToast("Please fill the required member details.");
      return;
    }

    if (editingMember) {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === editingMember.id
            ? {
                ...memberForm,
                id: editingMember.id,
              }
            : member
        )
      );

      showToast("Member profile updated successfully.");
    } else {
      const newMember = {
        ...memberForm,
        id: `IEC-M${String(members.length + 1).padStart(3, "0")}`,
      };

      setMembers((prev) => [...prev, newMember]);

      showToast("New IEC member added successfully.");
    }

    setShowMemberForm(false);
    setEditingMember(null);
    setMemberForm(emptyMember);
  };

  /* ---------------------------------------------------------
     EXPORT CSV
  --------------------------------------------------------- */

  const exportMembers = () => {
    const headers = [
      "Member ID",
      "Name",
      "Role",
      "Category",
      "Department",
      "Organization",
      "Email",
      "Phone",
      "Status",
      "Joined",
      "Term",
      "Training",
      "Workload",
    ];

    const rows = filteredMembers.map((member) => [
      member.id,
      member.name,
      member.role,
      member.category,
      member.department,
      member.organization,
      member.email,
      member.phone,
      member.status,
      member.joined,
      member.term,
      member.training,
      member.workload,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "iec-members.csv";
    link.click();

    URL.revokeObjectURL(url);

    showToast("IEC member list exported.");
  };

  /* ---------------------------------------------------------
     RESET FILTERS
  --------------------------------------------------------- */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  };

  /* ---------------------------------------------------------
     TRAINING
  --------------------------------------------------------- */

  const openTrainingModal = (memberName = "") => {
    setTrainingMember(memberName);
    setShowTrainingModal(true);
  };

  const saveTraining = (event) => {
    event.preventDefault();

    if (!trainingMember) {
      showToast("Select an IEC member first.");
      return;
    }

    setMembers((prev) =>
      prev.map((member) =>
        member.name === trainingMember
          ? {
              ...member,
              training: "Completed",
              lastTraining: "15 Sep 2026",
            }
          : member
      )
    );

    setShowTrainingModal(false);
    setTrainingMember("");

    showToast("Training record updated.");
  };

  /* =========================================================
     OVERVIEW
  ========================================================= */

  const renderOverview = () => (
    <div className="ia-section-content">
      <div className="ia-stats-grid">
        <StatCard
          icon={Users}
          label="Total Members"
          value={members.length}
          detail="IEC roster"
          type="primary"
        />

        <StatCard
          icon={UserCheck}
          label="Active Members"
          value={activeMembers}
          detail="Currently serving"
          type="success"
        />

        <StatCard
          icon={UserX}
          label="Inactive / Leave"
          value={inactiveMembers + leaveMembers}
          detail={`${inactiveMembers} inactive · ${leaveMembers} on leave`}
          type="warning"
        />

        <StatCard
          icon={ClipboardCheck}
          label="Training Attention"
          value={trainingDue}
          detail="Requires review"
          type="danger"
        />
      </div>

      <div className="ia-overview-grid">
        <div className="ia-card">
          <div className="ia-card-header">
            <div>
              <h3>IEC Composition</h3>
              <p>Current committee representation</p>
            </div>

            <ShieldCheck size={21} />
          </div>

          <div className="ia-composition">
            {[
              ["Medical", "Medical Members", "ia-composition-medical"],
              ["Scientific", "Scientific Members", "ia-composition-scientific"],
              ["Legal", "Legal Experts", "ia-composition-legal"],
              ["Community", "Community / Lay Members", "ia-composition-community"],
              ["Research", "Research Members", "ia-composition-research"],
            ].map(([key, label, className]) => {
              const count = members.filter(
                (member) => member.category === key
              ).length;

              const percentage = members.length
                ? Math.round((count / members.length) * 100)
                : 0;

              return (
                <div className="ia-composition-row" key={key}>
                  <div className="ia-composition-label">
                    <span className={`ia-dot ${className}`} />
                    <span>{label}</span>
                    <strong>{count}</strong>
                  </div>

                  <div className="ia-progress">
                    <div
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ia-card">
          <div className="ia-card-header">
            <div>
              <h3>Administration Health</h3>
              <p>Quick compliance overview</p>
            </div>

            <Award size={21} />
          </div>

          <div className="ia-health-list">
            <div className="ia-health-item">
              <div className="ia-health-icon success">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Member Records</strong>
                <span>All active profiles maintained</span>
              </div>

              <b>100%</b>
            </div>

            <div className="ia-health-item">
              <div className="ia-health-icon success">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Term Tracking</strong>
                <span>Committee terms are monitored</span>
              </div>

              <b>92%</b>
            </div>

            <div className="ia-health-item">
              <div className="ia-health-icon warning">
                <AlertTriangle size={18} />
              </div>

              <div>
                <strong>Training Records</strong>
                <span>One member requires renewal</span>
              </div>

              <b>88%</b>
            </div>

            <div className="ia-health-item">
              <div className="ia-health-icon success">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Meeting Attendance</strong>
                <span>Attendance records maintained</span>
              </div>

              <b>96%</b>
            </div>
          </div>
        </div>
      </div>

      <div className="ia-bottom-grid">
        <div className="ia-card">
          <div className="ia-card-header">
            <div>
              <h3>Upcoming IEC Meeting</h3>
              <p>Next scheduled committee activity</p>
            </div>

            <CalendarDays size={21} />
          </div>

          <div className="ia-meeting-highlight">
            <div className="ia-meeting-date">
              <strong>22</strong>
              <span>SEP</span>
            </div>

            <div className="ia-meeting-info">
              <strong>Monthly IEC Meeting</strong>
              <span>10:00 AM · Conference Room A</span>
              <small>8 agenda items · Attendance pending</small>
            </div>

            <ChevronRight size={20} />
          </div>
        </div>

        <div className="ia-card">
          <div className="ia-card-header">
            <div>
              <h3>Recent Administration Activity</h3>
              <p>Latest committee administration actions</p>
            </div>

            <Clock3 size={21} />
          </div>

          <div className="ia-activity-list">
            {activityLog.slice(0, 4).map((activity) => (
              <div className="ia-activity-item" key={activity.id}>
                <div className={`ia-activity-icon ${activity.type}`}>
                  {activity.type === "member" && <Users size={16} />}
                  {activity.type === "training" && <Award size={16} />}
                  {activity.type === "meeting" && (
                    <CalendarDays size={16} />
                  )}
                  {activity.type === "status" && <ShieldCheck size={16} />}
                </div>

                <div>
                  <strong>{activity.action}</strong>
                  <span>
                    {activity.actor} · {activity.target}
                  </span>
                </div>

                <small>{activity.time}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* =========================================================
     MEMBER MANAGEMENT
  ========================================================= */

  const renderMembers = () => (
    <div className="ia-section-content">
      <div className="ia-page-toolbar">
        <div>
          <h2>IEC Member Management</h2>
          <p>Maintain committee membership, roles and service status.</p>
        </div>

        <button className="ia-primary-btn" onClick={openAddMember}>
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="ia-card">
        <div className="ia-filter-toolbar">
          <div className="ia-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search member, role, department..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="ia-filter-control">
            <Filter size={17} />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="ia-filter-control">
            <BriefcaseBusiness size={17} />

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Medical">Medical</option>
              <option value="Scientific">Scientific</option>
              <option value="Legal">Legal</option>
              <option value="Community">Community</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <button className="ia-reset-btn" onClick={resetFilters}>
            <RotateCcw size={16} />
            Reset
          </button>

          <button className="ia-export-btn" onClick={exportMembers}>
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="ia-table-wrapper">
          <table className="ia-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Category</th>
                <th>Term</th>
                <th>Training</th>
                <th>Status</th>
                <th>Workload</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="ia-member-cell">
                        <div className="ia-avatar">
                          {member.name
                            .split(" ")
                            .slice(-2)
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{member.name}</strong>
                          <span>{member.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>{member.role}</td>

                    <td>
                      <span className="ia-category-pill">
                        {member.category}
                      </span>
                    </td>

                    <td>{member.term}</td>

                    <td>
                      <span className={getTrainingClass(member.training)}>
                        {member.training}
                      </span>
                    </td>

                    <td>
                      <span className={getStatusClass(member.status)}>
                        {member.status}
                      </span>
                    </td>

                    <td>
                      <div className="ia-workload">
                        <span>{member.workload}</span>
                        <small>studies</small>
                      </div>
                    </td>

                    <td>
                      <div className="ia-action-buttons">
                        <button
                          title="View member"
                          onClick={() => setSelectedMember(member)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Edit member"
                          onClick={() => openEditMember(member)}
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          title="More options"
                          onClick={() =>
                            showToast("Additional actions are available soon.")
                          }
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="ia-empty-state">
                      <Users size={38} />
                      <strong>No members found</strong>
                      <span>
                        Try changing your search or filter criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="ia-table-footer">
          <span>
            Showing <strong>{filteredMembers.length}</strong> of{" "}
            <strong>{members.length}</strong> members
          </span>

          <span>IEC Administration</span>
        </div>
      </div>
    </div>
  );

  /* =========================================================
     TRAINING
  ========================================================= */

  const renderTraining = () => (
    <div className="ia-section-content">
      <div className="ia-page-toolbar">
        <div>
          <h2>Training & Credentials</h2>
          <p>
            Monitor mandatory training and certification status of IEC members.
          </p>
        </div>

        <button className="ia-primary-btn" onClick={() => openTrainingModal()}>
          <Plus size={18} />
          Record Training
        </button>
      </div>

      <div className="ia-training-summary">
        <div className="ia-training-summary-card">
          <div className="ia-training-summary-icon success">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Valid Training</span>
            <strong>
              {members.filter((m) => m.training === "Completed").length}
            </strong>
          </div>
        </div>

        <div className="ia-training-summary-card">
          <div className="ia-training-summary-icon warning">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span>Needs Renewal</span>
            <strong>
              {members.filter((m) => m.training === "Due").length}
            </strong>
          </div>
        </div>

        <div className="ia-training-summary-card">
          <div className="ia-training-summary-icon danger">
            <XCircle size={20} />
          </div>
          <div>
            <span>Expired</span>
            <strong>
              {members.filter((m) => m.training === "Expired").length}
            </strong>
          </div>
        </div>
      </div>

      <div className="ia-card">
        <div className="ia-card-header">
          <div>
            <h3>Training Records</h3>
            <p>Certification and training history</p>
          </div>

          <Award size={21} />
        </div>

        <div className="ia-table-wrapper">
          <table className="ia-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Training / Certification</th>
                <th>Type</th>
                <th>Completed</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {initialTraining.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="ia-member-cell compact">
                      <div className="ia-avatar small">
                        {record.member
                          .split(" ")
                          .slice(-2)
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{record.member}</strong>
                        <span>{record.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{record.topic}</td>

                  <td>
                    <span className="ia-category-pill">
                      {record.type}
                    </span>
                  </td>

                  <td>{record.date}</td>

                  <td>{record.expiry}</td>

                  <td>
                    <span className={getTrainingClass(record.status)}>
                      {record.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="ia-small-action"
                      onClick={() => openTrainingModal(record.member)}
                    >
                      <Edit3 size={15} />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ia-card ia-training-alert">
        <div className="ia-alert-icon">
          <AlertTriangle size={21} />
        </div>

        <div>
          <strong>Training renewal required</strong>
          <p>
            Dr. Vikram Singh's annual GCP & Ethics refresher requires renewal.
            Update the training record after completion.
          </p>
        </div>

        <button
          className="ia-secondary-btn"
          onClick={() => openTrainingModal("Dr. Vikram Singh")}
        >
          Update Record
        </button>
      </div>
    </div>
  );

  /* =========================================================
     MEETINGS & ATTENDANCE
  ========================================================= */

  const renderMeetings = () => (
    <div className="ia-section-content">
      <div className="ia-page-toolbar">
        <div>
          <h2>Meetings & Attendance</h2>
          <p>Track IEC meetings, agendas and member attendance.</p>
        </div>

        <button
          className="ia-primary-btn"
          onClick={() => showToast("Meeting creation form is ready for backend integration.")}
        >
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      <div className="ia-meeting-stats">
        <div>
          <CalendarDays size={20} />
          <span>Upcoming</span>
          <strong>1</strong>
        </div>

        <div>
          <CheckCircle2 size={20} />
          <span>Completed</span>
          <strong>2</strong>
        </div>

        <div>
          <UserCheck size={20} />
          <span>Avg. Attendance</span>
          <strong>94%</strong>
        </div>
      </div>

      <div className="ia-card">
        <div className="ia-card-header">
          <div>
            <h3>IEC Meeting Schedule</h3>
            <p>Committee meetings and attendance records</p>
          </div>

          <CalendarDays size={21} />
        </div>

        <div className="ia-meeting-list">
          {meetings.map((meeting) => (
            <div className="ia-meeting-row" key={meeting.id}>
              <div className="ia-meeting-date-box">
                <strong>
                  {meeting.date.split(" ")[0]}
                </strong>
                <span>
                  {meeting.date.split(" ")[1]}
                </span>
              </div>

              <div className="ia-meeting-main">
                <strong>{meeting.title}</strong>

                <span>
                  {meeting.time} · {meeting.agenda}
                </span>

                <small>
                  Meeting ID: {meeting.id}
                </small>
              </div>

              <div className="ia-meeting-attendance">
                <span>Attendance</span>
                <strong>{meeting.attendance}</strong>
              </div>

              <span className={getStatusClass(meeting.status)}>
                {meeting.status}
              </span>

              <button
                className="ia-icon-button"
                onClick={() =>
                  showToast(`Opening ${meeting.id} attendance record.`)
                }
              >
                <Eye size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="ia-card">
        <div className="ia-card-header">
          <div>
            <h3>Attendance Overview</h3>
            <p>Member participation in recent meetings</p>
          </div>

          <UserCheck size={21} />
        </div>

        <div className="ia-attendance-grid">
          {members
            .filter((member) => member.status !== "Inactive")
            .map((member) => {
              const attendance =
                member.status === "On Leave"
                  ? 0
                  : Math.min(100, 72 + member.workload * 4);

              return (
                <div className="ia-attendance-card" key={member.id}>
                  <div className="ia-attendance-person">
                    <div className="ia-avatar small">
                      {member.name
                        .split(" ")
                        .slice(-2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </div>
                  </div>

                  <div className="ia-attendance-progress">
                    <div>
                      <span>Attendance</span>
                      <strong>{attendance}%</strong>
                    </div>

                    <div className="ia-progress">
                      <div
                        style={{
                          width: `${attendance}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  /* =========================================================
     ADMIN SETTINGS
  ========================================================= */

  const renderSettings = () => (
    <div className="ia-section-content">
      <div className="ia-page-toolbar">
        <div>
          <h2>IEC Administration Settings</h2>
          <p>Manage committee-level administrative configuration.</p>
        </div>
      </div>

      <div className="ia-settings-grid">
        <div className="ia-card">
          <div className="ia-card-header">
            <div>
              <h3>Committee Information</h3>
              <p>Basic IEC identity and contact details</p>
            </div>

            <Building2 size={21} />
          </div>

          <div className="ia-form-grid">
            <div className="ia-field">
              <label>Committee Name</label>
              <input
                defaultValue="Institutional Ethics Committee"
                type="text"
              />
            </div>

            <div className="ia-field">
              <label>Committee Code</label>
              <input defaultValue="AIIA-IEC-001" type="text" />
            </div>

            <div className="ia-field">
              <label>Institution</label>
              <input
                defaultValue="All India Institute of Ayurveda"
                type="text"
              />
            </div>

            <div className="ia-field">
              <label>Secretariat Email</label>
              <input
                defaultValue="iec.secretariat@aiia.gov.in"
                type="email"
              />
            </div>

            <div className="ia-field">
              <label>Contact Number</label>
              <input defaultValue="+91 11 0000 0000" type="tel" />
            </div>

            <div className="ia-field">
              <label>Committee Term</label>
              <input defaultValue="2024 - 2027" type="text" />
            </div>
          </div>

          <button
            className="ia-primary-btn"
            onClick={() => showToast("Committee settings saved.")}
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>

        <div className="ia-card">
          <div className="ia-card-header">
            <div>
              <h3>Administration Controls</h3>
              <p>Operational preferences</p>
            </div>

            <KeyRound size={21} />
          </div>

          <div className="ia-toggle-list">
            <div className="ia-toggle-row">
              <div>
                <strong>Training Expiry Alerts</strong>
                <span>Notify administrators before certifications expire.</span>
              </div>

              <label className="ia-switch">
                <input type="checkbox" defaultChecked />
                <span />
              </label>
            </div>

            <div className="ia-toggle-row">
              <div>
                <strong>Meeting Attendance Alerts</strong>
                <span>Flag incomplete attendance records.</span>
              </div>

              <label className="ia-switch">
                <input type="checkbox" defaultChecked />
                <span />
              </label>
            </div>

            <div className="ia-toggle-row">
              <div>
                <strong>Term Expiry Notifications</strong>
                <span>Notify the secretariat about upcoming term expiry.</span>
              </div>

              <label className="ia-switch">
                <input type="checkbox" defaultChecked />
                <span />
              </label>
            </div>

            <div className="ia-toggle-row">
              <div>
                <strong>Profile Change Logging</strong>
                <span>Record all member profile modifications.</span>
              </div>

              <label className="ia-switch">
                <input type="checkbox" defaultChecked />
                <span />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* =========================================================
     MODAL - MEMBER DETAILS
  ========================================================= */

  const renderMemberDetailsModal = () => {
    if (!selectedMember) return null;

    return (
      <div
        className="ia-modal-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setSelectedMember(null);
          }
        }}
      >
        <div className="ia-modal ia-member-modal">
          <div className="ia-modal-header">
            <div>
              <span className="ia-modal-kicker">IEC MEMBER PROFILE</span>
              <h3>{selectedMember.name}</h3>
              <p>{selectedMember.id}</p>
            </div>

            <button onClick={() => setSelectedMember(null)}>
              <X size={20} />
            </button>
          </div>

          <div className="ia-profile-header">
            <div className="ia-profile-avatar">
              {selectedMember.name
                .split(" ")
                .slice(-2)
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <strong>{selectedMember.role}</strong>
              <span>{selectedMember.category} · {selectedMember.department}</span>
              <span className={getStatusClass(selectedMember.status)}>
                {selectedMember.status}
              </span>
            </div>
          </div>

          <div className="ia-detail-grid">
            <div>
              <span>Email</span>
              <strong>{selectedMember.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{selectedMember.phone}</strong>
            </div>

            <div>
              <span>Organization</span>
              <strong>{selectedMember.organization}</strong>
            </div>

            <div>
              <span>Joined</span>
              <strong>{selectedMember.joined}</strong>
            </div>

            <div>
              <span>Committee Term</span>
              <strong>{selectedMember.term}</strong>
            </div>

            <div>
              <span>Training</span>
              <strong>{selectedMember.training}</strong>
            </div>

            <div>
              <span>Last Training</span>
              <strong>{selectedMember.lastTraining}</strong>
            </div>

            <div>
              <span>Assigned Studies</span>
              <strong>{selectedMember.workload}</strong>
            </div>
          </div>

          <div className="ia-modal-footer">
            <button
              className="ia-secondary-btn"
              onClick={() => {
                setSelectedMember(null);
                openEditMember(selectedMember);
              }}
            >
              <Edit3 size={16} />
              Edit Profile
            </button>

            <button
              className="ia-primary-btn"
              onClick={() => {
                setSelectedMember(null);
                showToast("Member profile exported.");
              }}
            >
              <Download size={16} />
              Export Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* =========================================================
     MODAL - MEMBER FORM
  ========================================================= */

  const renderMemberFormModal = () => {
    if (!showMemberForm) return null;

    return (
      <div
        className="ia-modal-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setShowMemberForm(false);
          }
        }}
      >
        <div className="ia-modal ia-form-modal">
          <div className="ia-modal-header">
            <div>
              <span className="ia-modal-kicker">
                {editingMember ? "EDIT MEMBER" : "ADD MEMBER"}
              </span>

              <h3>
                {editingMember
                  ? "Update IEC Member"
                  : "Add New IEC Member"}
              </h3>

              <p>
                Maintain committee member information and service details.
              </p>
            </div>

            <button onClick={() => setShowMemberForm(false)}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSaveMember}>
            <div className="ia-form-grid">
              <div className="ia-field">
                <label>
                  Full Name <span>*</span>
                </label>

                <input
                  value={memberForm.name}
                  onChange={(event) =>
                    handleFormChange("name", event.target.value)
                  }
                  placeholder="Enter full name"
                />
              </div>

              <div className="ia-field">
                <label>
                  Role <span>*</span>
                </label>

                <input
                  value={memberForm.role}
                  onChange={(event) =>
                    handleFormChange("role", event.target.value)
                  }
                  placeholder="e.g. Medical Member"
                />
              </div>

              <div className="ia-field">
                <label>Category</label>

                <select
                  value={memberForm.category}
                  onChange={(event) =>
                    handleFormChange("category", event.target.value)
                  }
                >
                  <option value="Medical">Medical</option>
                  <option value="Scientific">Scientific</option>
                  <option value="Legal">Legal</option>
                  <option value="Community">Community</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <div className="ia-field">
                <label>Department</label>

                <input
                  value={memberForm.department}
                  onChange={(event) =>
                    handleFormChange("department", event.target.value)
                  }
                  placeholder="Department / specialization"
                />
              </div>

              <div className="ia-field">
                <label>
                  Email <span>*</span>
                </label>

                <input
                  type="email"
                  value={memberForm.email}
                  onChange={(event) =>
                    handleFormChange("email", event.target.value)
                  }
                  placeholder="name@example.com"
                />
              </div>

              <div className="ia-field">
                <label>Phone</label>

                <input
                  value={memberForm.phone}
                  onChange={(event) =>
                    handleFormChange("phone", event.target.value)
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="ia-field">
                <label>Status</label>

                <select
                  value={memberForm.status}
                  onChange={(event) =>
                    handleFormChange("status", event.target.value)
                  }
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="ia-field">
                <label>Committee Term</label>

                <input
                  value={memberForm.term}
                  onChange={(event) =>
                    handleFormChange("term", event.target.value)
                  }
                  placeholder="2026 - 2029"
                />
              </div>

              <div className="ia-field">
                <label>Joined Date</label>

                <input
                  value={memberForm.joined}
                  onChange={(event) =>
                    handleFormChange("joined", event.target.value)
                  }
                  placeholder="15 Sep 2026"
                />
              </div>

              <div className="ia-field">
                <label>Training Status</label>

                <select
                  value={memberForm.training}
                  onChange={(event) =>
                    handleFormChange("training", event.target.value)
                  }
                >
                  <option value="Completed">Completed</option>
                  <option value="Due">Due</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="ia-form-note">
              <ShieldCheck size={17} />
              <span>
                Member information should be maintained according to IEC
                administrative and compliance procedures.
              </span>
            </div>

            <div className="ia-modal-footer">
              <button
                type="button"
                className="ia-secondary-btn"
                onClick={() => setShowMemberForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="ia-primary-btn">
                <Save size={16} />
                {editingMember ? "Save Changes" : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  /* =========================================================
     MODAL - TRAINING
  ========================================================= */

  const renderTrainingModal = () => {
    if (!showTrainingModal) return null;

    return (
      <div
        className="ia-modal-overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setShowTrainingModal(false);
          }
        }}
      >
        <div className="ia-modal ia-small-modal">
          <div className="ia-modal-header">
            <div>
              <span className="ia-modal-kicker">TRAINING RECORD</span>
              <h3>Record Training Completion</h3>
              <p>Update the member's latest training status.</p>
            </div>

            <button onClick={() => setShowTrainingModal(false)}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={saveTraining}>
            <div className="ia-field">
              <label>Select Member</label>

              <select
                value={trainingMember}
                onChange={(event) => setTrainingMember(event.target.value)}
              >
                <option value="">Select IEC member</option>

                {members.map((member) => (
                  <option value={member.name} key={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ia-field">
              <label>Training Type</label>

              <select defaultValue="GCP & Ethics Refresher">
                <option>GCP & Ethics Refresher</option>
                <option>Human Participant Protection</option>
                <option>Research Ethics</option>
                <option>Safety Reporting</option>
                <option>Other</option>
              </select>
            </div>

            <div className="ia-field">
              <label>Completion Date</label>

              <input type="date" defaultValue="2026-09-15" />
            </div>

            <div className="ia-form-note">
              <Award size={17} />
              <span>
                The training record will be marked as completed after saving.
              </span>
            </div>

            <div className="ia-modal-footer">
              <button
                type="button"
                className="ia-secondary-btn"
                onClick={() => setShowTrainingModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="ia-primary-btn">
                <Save size={16} />
                Save Training
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  /* =========================================================
     MAIN RENDER
  ========================================================= */

  return (
    <div className="iec-administration">
      {/* Header */}
      <div className="ia-module-header">
        <div>
          <div className="ia-breadcrumb">
            Ethics Committee
            <ChevronRight size={14} />
            <span>IEC Administration</span>
          </div>

          <h1>IEC Administration</h1>

          <p>
            Manage committee membership, credentials, meetings and
            administrative records.
          </p>
        </div>

        <div className="ia-header-actions">
          <button
            className="ia-header-secondary"
            onClick={() => showToast("Administration report generated.")}
          >
            <FileText size={17} />
            Report
          </button>

          <button className="ia-header-primary" onClick={openAddMember}>
            <UserPlus size={17} />
            Add Member
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="ia-subnav">
        <button
          className={activeSection === "overview" ? "active" : ""}
          onClick={() => setActiveSection("overview")}
        >
          <ShieldCheck size={17} />
          Overview
        </button>

        <button
          className={activeSection === "members" ? "active" : ""}
          onClick={() => setActiveSection("members")}
        >
          <Users size={17} />
          Member Management
        </button>

        <button
          className={activeSection === "training" ? "active" : ""}
          onClick={() => setActiveSection("training")}
        >
          <Award size={17} />
          Training & Credentials
        </button>

        <button
          className={activeSection === "meetings" ? "active" : ""}
          onClick={() => setActiveSection("meetings")}
        >
          <CalendarDays size={17} />
          Meetings & Attendance
        </button>

        <button
          className={activeSection === "settings" ? "active" : ""}
          onClick={() => setActiveSection("settings")}
        >
          <KeyRound size={17} />
          Administration Settings
        </button>
      </div>

      {/* Content */}
      {activeSection === "overview" && renderOverview()}
      {activeSection === "members" && renderMembers()}
      {activeSection === "training" && renderTraining()}
      {activeSection === "meetings" && renderMeetings()}
      {activeSection === "settings" && renderSettings()}

      {/* Modals */}
      {renderMemberDetailsModal()}
      {renderMemberFormModal()}
      {renderTrainingModal()}

      {/* Toast */}
      {toast && (
        <div className="ia-toast">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default IECAdministration;