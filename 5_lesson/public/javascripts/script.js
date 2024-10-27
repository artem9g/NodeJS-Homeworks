window.onload = (event) => {
  console.log('page is fully loaded')
}

async function deleteProduct(id) {
  try {
    const response = await fetch('/cars/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      console.log('Product deleted successfully')
      window.location.href = '/cars'
    } else {
      console.log('Error')
    }
  } catch (error) {
    console.log('Error:', error)
  }
}
