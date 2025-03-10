import React from 'react';

export default function CompletedTasks({ tasks, onDelete }) {
  return (
    <div className="card shadow h-100">
      <div className="card-header border-bottom">
        <h4 className="mb-0">
          <i className="bi bi-check2-all me-2 text-success"></i>
          Tamamlanan Görevler
        </h4>
      </div>
      <div className="card-body p-0 completed-list-container">
        {tasks.length === 0 ? (
          <div className="text-center text-muted p-4">
            <i className="bi bi-clipboard-check fs-1"></i>
            <p className="mt-2">Henüz tamamlanan görev bulunmuyor</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="p-3 border-bottom task-item">
              <div className="d-flex align-items-center gap-3">
                <div className="task-number">
                  <span className="badge bg-success rounded-pill">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-decoration-line-through">{task.title}</h5>
                  <p className="mb-0 text-muted small">{task.content}</p>
                  <small className="text-success">
                    <i className="bi bi-calendar-check me-1"></i>
                    Tamamlandı
                  </small>
                </div>
                <div className="task-actions">
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    title="Görevi sil"
                    onClick={() => onDelete(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 