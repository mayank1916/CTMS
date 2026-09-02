import { useState } from 'react'
import '../../styles/StudyCoordinator/coordinatorTasks.css'

function CoordinatorTasks() {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [studyFilter, setStudyFilter] = useState('All')

  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review participant documents',
      study: 'Cardio Health Study',
      assignedTo: 'Study Coordinator',
      dueDate: '02 Sep 2026',
      priority: 'High',
      status: 'Pending',
      description: 'Review and verify participant documents.'
    },
    {
      id: 2,
      title: 'Schedule participant visits',
      study: 'Diabetes Research Trial',
      assignedTo: 'Study Coordinator',
      dueDate: '03 Sep 2026',
      priority: 'Medium',
      status: 'Pending',
      description: 'Schedule upcoming participant visits.'
    },
    {
      id: 3,
      title: 'Upload study documents',
      study: 'Oncology Treatment Study',
      assignedTo: 'Study Coordinator',
      dueDate: '05 Sep 2026',
      priority: 'Medium',
      status: 'Pending',
      description: 'Upload required study documentation.'
    },
    {
      id: 4,
      title: 'Verify participant data',
      study: 'Mental Health Research',
      assignedTo: 'Study Coordinator',
      dueDate: '07 Sep 2026',
      priority: 'Low',
      status: 'Completed',
      description: 'Verify participant information in the system.'
    },
    {
      id: 5,
      title: 'Prepare review documents',
      study: 'Cardio Health Study',
      assignedTo: 'Study Coordinator',
      dueDate: '08 Sep 2026',
      priority: 'High',
      status: 'Pending',
      description: 'Prepare documents required for study review.'
    }
  ])

  const [form, setForm] = useState({
    title: '',
    study: 'Cardio Health Study',
    assignedTo: 'Study Coordinator',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    description: ''
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.study.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(search.toLowerCase())

    const matchesPriority =
      priorityFilter === 'All' ||
      task.priority === priorityFilter

    const matchesStudy =
      studyFilter === 'All' ||
      task.study === studyFilter

    return matchesSearch && matchesPriority && matchesStudy
  })

  const pendingCount = tasks.filter(
    (task) => task.status === 'Pending'
  ).length

  const completedCount = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const highPriorityCount = tasks.filter(
    (task) =>
      task.priority === 'High' &&
      task.status === 'Pending'
  ).length

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const openAddModal = () => {
    setEditingTask(null)

    setForm({
      title: '',
      study: 'Cardio Health Study',
      assignedTo: 'Study Coordinator',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending',
      description: ''
    })

    setShowModal(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)

    setForm({
      title: task.title,
      study: task.study,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      description: task.description
    })

    setShowModal(true)
  }

  const saveTask = (e) => {
    e.preventDefault()

    if (!form.title || !form.dueDate) {
      alert('Please enter task title and due date.')
      return
    }

    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...form }
            : task
        )
      )
    } else {
      const newTask = {
        id: Date.now(),
        ...form
      }

      setTasks([...tasks, newTask])
    }

    setShowModal(false)
    setEditingTask(null)
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'Completed'
                  ? 'Pending'
                  : 'Completed'
            }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this task?'
      )
    ) {
      setTasks(
        tasks.filter((task) => task.id !== id)
      )
    }
  }

  return (
    <div className="ct-page">

      {/* HEADER */}
      <div className="ct-header">

        <div>
          <h1>Tasks</h1>
          <p>Manage and track study coordination tasks</p>
        </div>

        <button
          className="ct-add-btn"
          onClick={openAddModal}
        >
          + Add Task
        </button>

      </div>

      {/* STATISTICS */}
      <div className="ct-stats">

        <div className="ct-stat-card">
          <div className="ct-stat-icon">📋</div>

          <div>
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="ct-stat-card">
          <div className="ct-stat-icon">⏳</div>

          <div>
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="ct-stat-card">
          <div className="ct-stat-icon">✅</div>

          <div>
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="ct-stat-card">
          <div className="ct-stat-icon">🔥</div>

          <div>
            <h3>{highPriorityCount}</h3>
            <p>High Priority</p>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="ct-filter-box">

        <input
          type="text"
          placeholder="Search tasks, studies or assignee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={studyFilter}
          onChange={(e) =>
            setStudyFilter(e.target.value)
          }
        >
          <option value="All">All Studies</option>
          <option value="Cardio Health Study">
            Cardio Health Study
          </option>
          <option value="Diabetes Research Trial">
            Diabetes Research Trial
          </option>
          <option value="Oncology Treatment Study">
            Oncology Treatment Study
          </option>
          <option value="Mental Health Research">
            Mental Health Research
          </option>
        </select>

      </div>

      {/* TASK TABLE */}
      <div className="ct-table-card">

        <div className="ct-table-header">
          <div>
            <h2>Task List</h2>
            <p>
              {filteredTasks.length} tasks found
            </p>
          </div>
        </div>

        {filteredTasks.length === 0 ? (

          <div className="ct-empty">
            <div>📋</div>
            <h3>No tasks found</h3>
            <p>
              Try changing your search or filters.
            </p>
          </div>

        ) : (

          <div className="ct-table-wrapper">

            <table className="ct-table">

              <thead>
                <tr>
                  <th>Task</th>
                  <th>Study</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredTasks.map((task) => (

                  <tr
                    key={task.id}
                    className={
                      task.status === 'Completed'
                        ? 'ct-row-completed'
                        : ''
                    }
                  >

                    <td>
                      <div className="ct-task-info">

                        <button
                          className={`ct-check ${
                            task.status === 'Completed'
                              ? 'checked'
                              : ''
                          }`}
                          onClick={() =>
                            toggleTask(task.id)
                          }
                        >
                          {task.status === 'Completed'
                            ? '✓'
                            : ''}
                        </button>

                        <div>
                          <strong>
                            {task.title}
                          </strong>

                          <small>
                            Task #{task.id}
                          </small>
                        </div>

                      </div>
                    </td>

                    <td>{task.study}</td>

                    <td>{task.assignedTo}</td>

                    <td>{task.dueDate}</td>

                    <td>
                      <span
                        className={`ct-priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`ct-status ${task.status.toLowerCase()}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>

                      <div className="ct-actions">

                        <button
                          className="ct-view"
                          onClick={() =>
                            setSelectedTask(task)
                          }
                        >
                          View
                        </button>

                        <button
                          className="ct-edit"
                          onClick={() =>
                            openEditModal(task)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="ct-delete"
                          onClick={() =>
                            deleteTask(task.id)
                          }
                        >
                          🗑
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (

        <div
          className="ct-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="ct-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="ct-modal-header">

              <div>
                <h2>
                  {editingTask
                    ? 'Edit Task'
                    : 'Add New Task'}
                </h2>

                <p>
                  {editingTask
                    ? 'Update task information'
                    : 'Create a new coordination task'}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>

            </div>

            <form onSubmit={saveTask}>

              <div className="ct-form-grid">

                <div className="ct-form-group ct-full">
                  <label>Task Title *</label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="ct-form-group">
                  <label>Study</label>

                  <select
                    name="study"
                    value={form.study}
                    onChange={handleInput}
                  >
                    <option>
                      Cardio Health Study
                    </option>

                    <option>
                      Diabetes Research Trial
                    </option>

                    <option>
                      Oncology Treatment Study
                    </option>

                    <option>
                      Mental Health Research
                    </option>
                  </select>
                </div>

                <div className="ct-form-group">
                  <label>Assigned To</label>

                  <input
                    name="assignedTo"
                    value={form.assignedTo}
                    onChange={handleInput}
                    placeholder="Enter assignee"
                  />
                </div>

                <div className="ct-form-group">
                  <label>Due Date *</label>

                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleInput}
                  />
                </div>

                <div className="ct-form-group">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleInput}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="ct-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInput}
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className="ct-form-group ct-full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInput}
                    placeholder="Enter task description..."
                    rows="4"
                  />
                </div>

              </div>

              <div className="ct-modal-footer">

                <button
                  type="button"
                  className="ct-cancel"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ct-save"
                >
                  {editingTask
                    ? 'Save Changes'
                    : 'Create Task'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* VIEW MODAL */}
      {selectedTask && (

        <div
          className="ct-modal-overlay"
          onClick={() =>
            setSelectedTask(null)
          }
        >

          <div
            className="ct-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="ct-modal-header">

              <div>
                <h2>Task Details</h2>
                <p>
                  Complete information about this task
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedTask(null)
                }
              >
                ✕
              </button>

            </div>

            <div className="ct-details">

              <div className="ct-detail-row">
                <span>Task</span>
                <strong>
                  {selectedTask.title}
                </strong>
              </div>

              <div className="ct-detail-row">
                <span>Task ID</span>
                <strong>
                  #{selectedTask.id}
                </strong>
              </div>

              <div className="ct-detail-row">
                <span>Study</span>
                <strong>
                  {selectedTask.study}
                </strong>
              </div>

              <div className="ct-detail-row">
                <span>Assigned To</span>
                <strong>
                  {selectedTask.assignedTo}
                </strong>
              </div>

              <div className="ct-detail-row">
                <span>Due Date</span>
                <strong>
                  {selectedTask.dueDate}
                </strong>
              </div>

              <div className="ct-detail-row">
                <span>Priority</span>
                <strong>
                  {selectedTask.priority}
                </strong>
              </div>

              <div className="ct-detail-row">
                <span>Status</span>
                <strong>
                  {selectedTask.status}
                </strong>
              </div>

              <div className="ct-detail-description">
                <span>Description</span>

                <p>
                  {selectedTask.description ||
                    'No description added.'}
                </p>
              </div>

            </div>

            <div className="ct-modal-footer">

              <button
                className="ct-cancel"
                onClick={() =>
                  setSelectedTask(null)
                }
              >
                Close
              </button>

              <button
                className="ct-save"
                onClick={() => {
                  setSelectedTask(null)
                  openEditModal(selectedTask)
                }}
              >
                Edit Task
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CoordinatorTasks