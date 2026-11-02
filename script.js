// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)

// Step 2: render() - rebuild the table rows from the array

// Step 3: delete (one listener on #rows - event delegation, by data-id)

// Step 4: total of the expenses that are shown

// Step 5: filter by category

// Step 6: sort by amount (toSorted - the original array keeps its order)

// Step 7: rows with an amount above 100 get the class "big"

const form = document.getElementById("expense-form")
const descInput = document.getElementById("desc")
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category")
const formError = document.getElementById("form-error")
const rows = document.getElementById("rows")
const noRows = document.getElementById("no-rows")
const total = document.getElementById("total")
const filterInput = document.getElementById("filter")
const sortBtn = document.getElementById("sort-btn")


let expenses = []
let nextId = 1
let currentFilter = "all"
let sortOn = false

//step1
form.addEventListener("submit", function(event) {
    event.preventDefault()

    const desc = descInput.value.trim()
    const amount = Number(amountInput.value)
    const category = categoryInput.value

    if(!desc) {
        formError.textContent = "Please add a description"
        formError.hidden = false
        return
    }
    if(amount<= 0) {
        formError.textContent = "The amount must be larger than 0"
        formError.hidden = false
        return
    }
    formError.hidden = true

    const expense = {
        id: nextId,
        desc: desc,
        amount: amount,
        category: category
    };
    expenses.push(expense)
    nextId++

    render()

    descInput.value = ""
    amountInput.value = ""
    descInput.focus()

})

//step2
function render() {
    rows.innerHTML = ""

    //step5
    let shownExpenses = expenses
    if(currentFilter !== "all") {
        shownExpenses = expenses.filter(function(expense) {
            return expense.category === currentFilter
        })
    }
    //////
    //step6
    if(sortOn) {
        shownExpenses = shownExpenses.toSorted(function(a,b) {
            return b.amount-a.amount
        })
    }
    //////

    if(shownExpenses.length === 0) {
        noRows.hidden = false
    }
    else {
        noRows.hidden = true
    }

    let sum = 0 //step4

    shownExpenses.forEach(function(expense) {
        const tr = document.createElement("tr")

        //step7
        if(expense.amount > 100) {
            tr.classList.add("big")
        }
        /////

        const descTd = document.createElement("td")
        descTd.textContent = expense.desc
        tr.appendChild(descTd)

        const categoryTd = document.createElement("td")
        const badge = document.createElement("span")
        badge.classList.add("badge")
        badge.textContent = expense.category
        categoryTd.appendChild(badge)

        const amountTd = document.createElement("td")
        amountTd.textContent = expense.amount.toFixed(2)

        const deleteTd = document.createElement("td")
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "x"
        deleteBtn.classList.add("delete")
        deleteBtn.dataset.id = expense.id
        deleteTd.appendChild(deleteBtn)

        tr.appendChild(descTd)
        tr.appendChild(categoryTd)
        tr.appendChild(amountTd)
        tr.appendChild(deleteTd)

        rows.appendChild(tr)

        sum += expense.amount //step4
    })

    total.textContent = sum.toFixed(2) //step4
}

render()

//step3
rows.addEventListener("click", function(event) {
    if(!event.target.classList.contains("delete")) {
        return
    }
    const id = Number(event.target.dataset.id)

    expenses = expenses.filter( function(expense) {
        return expense.id !== id
    })

    render()
})

//step5
filterInput.addEventListener("change", function() {
    currentFilter = filterInput.value
    render()
})

//step6
sortBtn.addEventListener("click", function() {
    sortOn = !sortOn
    if(sortOn)
        sortBtn.textContent = "Sort by amount: on"
    else
        sortBtn.textContent = "Sort by amount: off"

    render()
})
