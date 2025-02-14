# API key

AIzaSyAgOUHAhKm41VdeCd-QXg3tpQJfSy0YkVA

# Table code

```js
import Swal from 'sweetalert2';

 Swal.fire({
            title: 'Good job!',
            text: 'Login successful!',
            icon: 'success',
          });

 Swal.fire({
              title: 'Error!',
              text: 'Incorrect password. Try again.',
              icon: 'info',
              confirmButtonText: 'Great 😋',
            });

Swal.fire('Hello!', 'This is a simple alert.', 'info');


```

# 

Here are a few **SweetAlert** examples for your **Angular** app using **SweetAlert2** (`ngx-sweetalert2`).  

### 1️⃣ Install SweetAlert2  
First, install the package if you haven't already:  
```sh
npm install sweetalert2
```

### 2️⃣ Import in Component  
In your Angular component (e.g., `app.component.ts`), import SweetAlert2:  
```typescript
import Swal from 'sweetalert2';
```

---

### 📌 1. Simple Alert  
```typescript
Swal.fire('Hello!', 'This is a simple alert.', 'info');
```

---

### 📌 2. Success Alert  
```typescript
Swal.fire({
  title: 'Success!',
  text: 'Your action was successful.',
  icon: 'success',
  confirmButtonText: 'OK'
});
```

---

### 📌 3. Error Alert  
```typescript
Swal.fire({
  title: 'Error!',
  text: 'Something went wrong!',
  icon: 'error',
  confirmButtonText: 'Try Again'
});
```

---

### 📌 4. Confirmation Dialog  
```typescript
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  }
});
```

---

### 📌 5. Prompt (User Input)  
```typescript
Swal.fire({
  title: 'Enter your name',
  input: 'text',
  inputPlaceholder: 'Your name...',
  showCancelButton: true
}).then((result) => {
  if (result.isConfirmed && result.value) {
    Swal.fire(`Hello, ${result.value}!`);
  }
});
```

---

### 📌 6. Auto Close Alert  
```typescript
Swal.fire({
  title: 'Auto close alert!',
  text: 'This will close in 3 seconds.',
  icon: 'info',
  timer: 3000,
  showConfirmButton: false
});
```

---

### 📌 7. Toast Notification  
```typescript
Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Signed in successfully',
  showConfirmButton: false,
  timer: 3000
});
```

---

### 📌 8. Custom HTML Alert  
```typescript
Swal.fire({
  title: '<strong>HTML <u>example</u></strong>',
  icon: 'info',
  html: 'You can use <b>bold</b> text, <a href="#">links</a>, and more!',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
  cancelButtonText: '<i class="fa fa-thumbs-down"></i> Not good'
});
```

Would you like any other variations or customization? 😊🚀

