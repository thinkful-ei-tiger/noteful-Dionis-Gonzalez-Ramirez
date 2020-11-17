const baseURL = 'http://localhost:9090';

const getData = function() {
  return (
    fetch(`${baseURL}/db`)
    .then(res => res.json())
  )
}

const addFolder = function() {
  return (
    fetch(`${baseURL}/folders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: ''})
    })
    .then(res => res.json())
  )
}

const editFolder = function(folderName, folderID) {
  return (
    fetch(`${baseURL}/folders/${folderID}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: folderName})
    })
    .then(res => res.json())
    .then(resJson => console.log(resJson))
  )
}

const deleteFolder = function(folderID) {
  return (
    fetch(`${baseURL}/folders/${folderID}`, {
      method: 'DELETE',
    })
  )
}

export default {
  getData,
  addFolder,
  editFolder,
  deleteFolder
}