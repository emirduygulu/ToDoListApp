import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import './App.css';
import CreateTask from './CreateTask';
import Header from './Header';
import Task from './Task';
import ProcessList from './ProcessList';
import CompletedTasks from './CompletedTasks';

function App() {
  // Ana state yönetimi
  // tasks: Yeni eklenen ve bekleyen görevler
  // processTasks: İşlem sırasındaki görevler
  // completedTasks: Tamamlanan görevler
  const [tasks, setTasks] = useState([]);
  const [processTasks, setProcessTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Görev için benzersiz ID oluşturma fonksiyonu
  // Başlık ve içeriği birleştirip URL dostu bir formata dönüştürür
  const createUniqueId = (task) => {
    return `${task.title}-${task.content}`.replace(/\s+/g, '-').toLowerCase();
  };

  // Yeni görev ekleme fonksiyonu
  // newTask: {title: string, content: string}
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: createUniqueId(newTask),
      status: 'pending'
    };
    setTasks(prevTask => [...prevTask, taskWithId]);
  };

  // Ana listedeki görevi silme
  // id: Silinecek görevin index numarası
  const deleteTask = (id) => {
    setTasks(prevTask => prevTask.filter((_, index) => index !== id));
  };

  // Tamamlanan görevi silme
  // id: Silinecek görevin index numarası
  const deleteCompletedTask = (id) => {
    setCompletedTasks(prev => prev.filter((_, index) => index !== id));
  };

  // Görev durumunu değiştirme fonksiyonu
  // id: Durumu değiştirilecek görevin index numarası
  // newStatus: 'inProgress' | 'completed'
  const handleTaskStatusChange = (id, newStatus) => {
    const taskToMove = tasks[id];
    
    // Mükerrer görev kontrolü
    if (newStatus === 'inProgress') {
      const isTaskInProcess = processTasks.some(task => task.id === taskToMove.id);
      if (isTaskInProcess) {
        return; // Görev zaten işlem sırasındaysa ekleme yapma
      }
    }

    // Görevi ana listeden kaldır
    setTasks(prevTasks => {
      return prevTasks.filter((_, index) => index !== id);
    });

    // Görevi yeni durumuna göre ilgili listeye ekle
    if (newStatus === 'inProgress') {
      setProcessTasks(prev => [...prev, { ...taskToMove, status: newStatus }]);
    } else if (newStatus === 'completed') {
      setCompletedTasks(prev => [...prev, { ...taskToMove, status: 'completed' }]);
    }
  };

  // İşlem sırasındaki görevi silme
  // index: Silinecek görevin index numarası
  const deleteProcessTask = (index) => {
    setProcessTasks(prev => prev.filter((_, i) => i !== index));
  };

  // İşlem sırasındaki görevi tamamlandı olarak işaretleme
  // index: Tamamlanan görevin index numarası
  const completeProcessTask = (index) => {
    const taskToComplete = processTasks[index];
    setProcessTasks(prev => prev.filter((_, i) => i !== index));
    setCompletedTasks(prev => [...prev, { ...taskToComplete, status: 'completed' }]);
  };

  // Sürükle-bırak işlemi sonrası çalışan fonksiyon
  // result: {source: {index}, destination: {index}}
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(processTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProcessTasks(items);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row">
          {/* Yeni görev ekleme ve bekleyen görevler bölümü */}
          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-header border-bottom">
                <h4 className="mb-0">
                  <i className="bi bi-plus-circle me-2 text-primary"></i>
                  Yeni Görev Ekle
                </h4>
              </div>
              <div className="card-body">
                <CreateTask onAdd={addTask} />
                <div className="task-container mt-4">
                  {tasks.map((taskItem, index) => (
                    <Task
                      key={taskItem.id}
                      id={index}
                      title={taskItem.title}
                      content={taskItem.content}
                      status={taskItem.status}
                      onDelete={deleteTask}
                      onStatusChange={handleTaskStatusChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* İşlem sırasındaki görevler bölümü */}
          <div className="col-md-4">
            <DragDropContext onDragEnd={onDragEnd}>
              <ProcessList 
                tasks={processTasks} 
                onDelete={deleteProcessTask}
                onComplete={completeProcessTask}
              />
            </DragDropContext>
          </div>
          {/* Tamamlanan görevler bölümü */}
          <div className="col-md-4">
            <CompletedTasks 
              tasks={completedTasks}
              onDelete={deleteCompletedTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
