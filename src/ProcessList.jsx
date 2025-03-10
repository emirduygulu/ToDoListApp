import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

export default function ProcessList({ tasks, onDelete, onComplete }) {
  const createUniqueId = (task) => {
    return `${task.title}-${task.content}`.replace(/\s+/g, '-').toLowerCase();
  };

  return (
    <div className="card shadow h-100">
      <div className="card-header border-bottom">
        <h4 className="mb-0">
          <i className="bi bi-list-check me-2 text-warning"></i>
          İşlem Sırası
        </h4>
      </div>
      <Droppable droppableId="processList">
        {(provided) => (
          <div
            className="card-body p-0 process-list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.length === 0 ? (
              <div className="text-center text-muted p-4">
                <i className="bi bi-inbox-fill fs-1"></i>
                <p className="mt-2">İşlem sırasında görev bulunmuyor</p>
              </div>
            ) : (
              tasks.map((task, index) => {
                const uniqueId = createUniqueId(task);
                return (
                  <Draggable
                    key={uniqueId}
                    draggableId={uniqueId}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 border-bottom task-item"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className="task-number">
                            <span className="badge bg-warning rounded-pill">
                              {index + 1}
                            </span>
                          </div>
                          <i className="bi bi-grip-vertical text-muted"></i>
                          <div className="flex-grow-1">
                            <h5 className="mb-1">{task.title}</h5>
                            <p className="mb-0 text-muted small">{task.content}</p>
                          </div>
                          <div className="task-actions d-flex gap-2">
                            <button 
                              className="btn btn-sm btn-outline-success"
                              title="Yapıldı olarak işaretle"
                              onClick={() => onComplete(index)}
                            >
                              <i className="bi bi-check-circle"></i>
                            </button>
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
                    )}
                  </Draggable>
                );
              })
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
} 