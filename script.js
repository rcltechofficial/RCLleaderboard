const container = document.getElementById("row-container");
let draggedRow;

container.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("row")) {
    draggedRow = e.target;
    e.target.style.opacity = 0.5;
  }
});

container.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("row")) {
    e.target.style.opacity = "";
    updateRanks();
  }
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  if (afterElement == null) {
    container.appendChild(draggedRow);
  } else {
    container.insertBefore(draggedRow, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".row:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateRanks() {
  const rows = container.querySelectorAll(".row");
  rows.forEach((row, index) => {
    row.querySelector(".rank").textContent = index + 1;
  });
}
document.querySelectorAll('.info-btn').forEach(button => {
  button.addEventListener('mousemove', e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  });
});
// Load saved order on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedOrder = JSON.parse(localStorage.getItem("rowOrder"));
  if (savedOrder) {
    savedOrder.forEach(id => {
      const row = document.querySelector(`.row[data-id="${id}"]`);
      if (row) container.appendChild(row);
    });
    updateRanks();
  }
});

container.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("row")) {
    draggedRow = e.target;
    e.target.style.opacity = 0.5;
  }
});

container.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("row")) {
    e.target.style.opacity = "";
    updateRanks();
    saveOrder(); // save order after drag
  }
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  if (afterElement == null) {
    container.appendChild(draggedRow);
  } else {
    container.insertBefore(draggedRow, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".row:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateRanks() {
  const rows = container.querySelectorAll(".row");
  rows.forEach((row, index) => {
    row.querySelector(".rank").textContent = index + 1;
  });
}

function saveOrder() {
  const rows = [...container.querySelectorAll(".row")];
  const order = rows.map(row => row.getAttribute("data-id"));
  localStorage.setItem("rowOrder", JSON.stringify(order));
}

document.querySelectorAll('.info-btn').forEach(button => {
  button.addEventListener('mousemove', e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  });
});
