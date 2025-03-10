import React from 'react'

export default function Task(props) {
  const deleteClick = () => {
    props.onDelete(props.id);
  };

  const handleComplete = () => {
    props.onStatusChange(props.id, 'completed');
  };

  const handleInProgress = () => {
    props.onStatusChange(props.id, 'inProgress');
  };
  
  const getStatusIcon = () => {
    switch(props.status) {
      case 'completed':
        return <i className="bi bi-check-circle-fill text-success fs-4"></i>;
      case 'inProgress':
        return <i className="bi bi-exclamation-circle-fill text-warning fs-4"></i>;
      default:
        return <i className="bi bi-circle text-muted fs-4"></i>;
    }
  };
  
  return (
    <div className='col-md-12 mb-4'>
      <div className='card h-100 shadow-sm'>
        <div className='card-body'>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className='card-title text-primary fw-bold mb-0'>{props.title}</h5>
            <div className="status-icon">
              {getStatusIcon()}
            </div>
          </div>
          <p className='card-text text-muted'>{props.content}</p>
        </div>
        <div className='card-footer bg-transparent border-0 pb-3'>
          <div className="d-flex gap-2">
            <button 
              className='btn btn-outline-success flex-grow-1' 
              onClick={handleComplete}
              disabled={props.status === 'completed'}
            >
              <i className="bi bi-check-circle me-2"></i>
              Yapıldı
            </button>
            <button 
              className='btn btn-outline-warning flex-grow-1' 
              onClick={handleInProgress}
              disabled={props.status === 'inProgress'}
            >
              <i className="bi bi-hourglass-split me-2"></i>
              İşleme Al
            </button>
            <button 
              className='btn btn-outline-danger flex-grow-1' 
              onClick={deleteClick}
            >
              <i className="bi bi-trash me-2"></i>
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
