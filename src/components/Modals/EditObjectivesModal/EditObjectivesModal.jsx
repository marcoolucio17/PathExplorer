import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import modalStyles from './EditObjectivesModal.module.css';

export const EditObjectivesModal = ({ isOpen, onClose, objectives = [], onSave }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [objectivesList, setObjectivesList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: '',
    priority: 'medium',
    completed: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      targetDate: '',
      priority: 'medium',
      completed: false
    });
  };

  useEffect(() => {
    console.log('EditObjectivesModal useEffect - isOpen:', isOpen, 'objectives:', objectives);
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setObjectivesList([...objectives]);
      setEditingIndex(null);
      resetForm();
    }
  }, [isOpen, objectives]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (index) => {
    const objective = objectivesList[index];
    setFormData({
      title: objective.title,
      description: objective.description,
      targetDate: objective.targetDate,
      priority: objective.priority,
      completed: objective.completed
    });
    setEditingIndex(index);
  };

  const handleSaveObjective = () => {
    if (!formData.title || !formData.description || !formData.targetDate) return;

    const newObjective = {
      id: editingIndex !== null ? objectivesList[editingIndex].id : Date.now(),
      ...formData
    };

    if (editingIndex !== null) {
      // Update existing
      const updated = [...objectivesList];
      updated[editingIndex] = newObjective;
      setObjectivesList(updated);
    } else {
      // Add new
      setObjectivesList([...objectivesList, newObjective]);
    }

    resetForm();
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updated = objectivesList.filter((_, i) => i !== index);
    setObjectivesList(updated);
    if (editingIndex === index) {
      resetForm();
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with actual API call
      
      if (onSave) {
        onSave(objectivesList);
      }
      
      handleClose();
    } catch (error) {
      console.error('Error updating objectives:', error);
    }
  };

  const isFormValid = () => {
    return formData.title && formData.description && formData.targetDate;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} style={{ maxWidth: '700px' }}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Edit Career Objectives</h2>
          <p className={styles.subtitle}>Manage your professional goals and targets</p>
        </div>

        <div className={styles.modalBody} style={{ height: 'calc(100% - 200px)' }}>
          <div className={modalStyles.objectivesEditor}>
            {/* Objectives List */}
            <div className={modalStyles.objectivesList}>
              <h3>Current Objectives</h3>
              {objectivesList.map((obj, index) => (
                <div key={obj.id} className={`${modalStyles.objectiveItem} ${editingIndex === index ? modalStyles.editing : ''} ${obj.completed ? modalStyles.completed : ''}`}>
                  <div className={modalStyles.objectiveInfo}>
                    <div className={modalStyles.objectiveHeader}>
                      <h4>{obj.title}</h4>
                      <div className={modalStyles.objectiveMeta}>
                        <span 
                          className={modalStyles.priorityBadge}
                          style={{ backgroundColor: getPriorityColor(obj.priority) }}
                        >
                          {obj.priority}
                        </span>
                        <span className={modalStyles.dateBadge}>
                          {formatDate(obj.targetDate)}
                        </span>
                      </div>
                    </div>
                    <p>{obj.description}</p>
                    {obj.completed && (
                      <span className={modalStyles.completedBadge}>
                        <i className="bi bi-check-circle-fill"></i>
                        Completed
                      </span>
                    )}
                  </div>
                  <div className={modalStyles.objectiveActions}>
                    <button 
                      type="button"
                      onClick={() => handleEdit(index)}
                      className={modalStyles.editBtn}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDelete(index)}
                      className={modalStyles.deleteBtn}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Objectives Form */}
            <div className={modalStyles.objectiveForm}>
              <h3>{editingIndex !== null ? 'Edit Objective' : 'Add New Objective'}</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="title">Objective Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Complete Q2 Performance Review"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Complete the self-assessment and gather feedback from peers and supervisors..."
                  rows="3"
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="targetDate">Target Date *</label>
                  <input
                    type="date"
                    id="targetDate"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={modalStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleInputChange}
                  />
                  Mark as completed
                </label>
              </div>

              <div className={modalStyles.formActions}>
                {editingIndex !== null && (
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    Cancel Edit
                  </button>
                )}
                
                <button 
                  type="button"
                  onClick={handleSaveObjective}
                  disabled={!isFormValid()}
                  className={styles.primaryButton}
                >
                  <i className="bi bi-plus-lg"></i>
                  {editingIndex !== null ? 'Update' : 'Add'} Objective
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="button"
            onClick={handleClose} 
            className={styles.cancelButton}
          >
            <i className="bi bi-x-lg"></i>
            Cancel
          </button>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className={styles.saveButton}
          >
            <i className="bi bi-check-lg"></i>
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};