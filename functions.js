

let todoHTML = JSON.parse(localStorage.getItem('taskHTML')) || '';



let todoArray = JSON.parse(localStorage.getItem('taskArray')) || [
/*     {
        id: 0,
        todoTask: "complete JS project",
        complete: false
    } */
]


function saveData () {
    localStorage.setItem('taskHTML', JSON.stringify(todoHTML));
}

function saveArray () {
    localStorage.setItem('taskArray', JSON.stringify(todoArray));
}

export function taskFinder (productId) {
    let product;
    todoArray.forEach((productDetails) => {
        if(productDetails.id == productId) {
            product = productDetails
        }
    })
    
    return product;
};

export function taskAdder () {
    document.querySelector(".js-add-button")
        .addEventListener('click', () => {
        let task = document.querySelector(".js-task-input")
        if (task.value !== '') {
            const pushTask = {
                id: idgiver(),
                todoTask: task.value,
                complete: false
            }
            todoArray.push(pushTask);
      
            task.value = '';
        }
        saveArray();
        updateHTML();
        completeLine();
        deleteFun();

    });

    document.querySelector(".js-task-input")
    .addEventListener('keydown', () => {
        if (event.key == 'Enter') {
            let task = document.querySelector(".js-task-input")
            if (task.value !== '') {
                const pushTask = {
                    id: idgiver(),
                    todoTask: task.value,
                    complete: false
                }
                todoArray.push(pushTask);
        
                task.value = '';
            }
            saveArray();
            updateHTML();
            completeLine();
            deleteFun();
        };
    });
};


export function idgiver() {
    let id;
    todoArray.forEach((task) => {
        id = task.id + 1;
    });
    if (id == undefined) {
        id = 0;
    }
    return id;
};

export function HTMLgenerator () {
    document.querySelector(".todo-list")
        .innerHTML = todoHTML;
};

//addding main fucnction

/* console.log(todoArray); */



export function completeLine () {
    document.querySelectorAll(".task")
        .forEach((task) => {
            let productId = task.dataset.productId
/*             console.log(productId); */

            document.querySelector(`.checkbox-${productId}`)
                .addEventListener("click",  () => {
                    trueFalseGaver(productId)
                  
            })

        })
}

function trueFalseGaver (productId) {
    const product = taskFinder(productId)
    if (product.complete == false) {
        product.complete = true;
        document.querySelector(`.task-div-${product.id}`)
            .classList.add("deco-task-div")
/*             console.log(true);  
            console.log(todoArray);  */ 
        
    }
    else {
        product.complete = false;

        document.querySelector(`.task-div-${product.id}`)
            .classList.remove("deco-task-div");
/*             console.log(false);
            console.log(todoArray); */
    }
    saveArray();

}


export function updateHTML () {
    let html = '';

    todoArray.forEach((taskList) => {
        const ischecked = taskList.complete ? "checked" : '';
        const lineThrough = taskList.complete ? "deco-task-div": ''; 
        html += `
          <div class="task task-${taskList.id}" data-product-id = ${taskList.id}>
                    <div class="checkbox-div checkbox-${taskList.id}">
    
                        <input type="checkbox" ${ischecked} class="checkbox checkBox-${taskList.id}" data-product-id = ${taskList.id}>
    
                    </div>
    
                    <div class="task-div task-div-${taskList.id} ${lineThrough}">
                        ${taskList.todoTask}
                    </div>
    
                    <div class="cross-button" data-product-id = ${taskList.id}>
                        <button class="delete-button delete-button-${taskList.id}">X</button>
                    </div>
    
                </div>
        `;
    })

    todoHTML = html;

    saveData();

    HTMLgenerator();
}

//working on delete button

export function deleteFun() {
    document.querySelectorAll(".task")
    .forEach((taskDiv) => {
        const productId = taskDiv.dataset.productId 
        deleteButton(productId)
        
    })
}

function deleteButton(productId) {
    document.querySelector(`.delete-button-${productId}`)
        .addEventListener("click", () => {
            removeFromArray(productId)
            document.querySelector(`.task-${productId}`).remove();
    })

}

function removeFromArray (productId) {
    const newArray = [];
    todoArray.forEach((task) => {
        if(task.id != productId) {
            newArray.push(task)
        }
    });

    todoArray = newArray;
    saveArray();
}
//project completed