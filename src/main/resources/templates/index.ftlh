<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Directory</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <header>
        <h1>Employee Directory</h1>
        <div class="actions">
            <input type="text" id="search" placeholder="Search by name or email" />
            <button id="filter-btn">Filter</button>
            <button id="add-employee-btn">Add Employee</button>
        </div>
    </header>

    <main id="employee-container">
        <#list employees as employee>
            <div class="employee-card" data-id="${employee.id}">
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <button class="edit-btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </div>
        </#list>
    </main>

    <div id="pagination"></div>

    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>
