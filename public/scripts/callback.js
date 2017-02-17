var items = new vis.DataSet([
    {id: 1, content: 'item 1', start: new Date(2013, 3, 20)},
    {id: 2, content: 'item 2', start: new Date(2013, 3, 14)},
    {id: 3, content: 'item 3', start: new Date(2013, 3, 18)},
    {id: 4, content: 'item 4', start: new Date(2013, 3, 16), end: new Date(2013, 3, 19)},
    {id: 5, content: 'item 5', start: new Date(2013, 3, 25)},
    {id: 6, content: 'item 6', start: new Date(2013, 3, 27)}
  ]);

  var min = new Date(2013, 3, 1); // 1 april
  var max = new Date(2013, 3, 30, 23, 59, 59); // 30 april

  var container = document.getElementById('visualization');
  var options = {
    editable: true,

    onAdd: function (item, callback) {
      prettyPrompt('Add item', 'Enter text content for new item:', item.content, function (value) {
        if (value) {
          item.content = value;
          callback(item); // send back adjusted new item
        }
        else {
          callback(null); // cancel item creation
        }
      });
    },

    onMove: function (item, callback) {
      var title = 'Do you really want to move the item to\n' +
          'start: ' + item.start + '\n' +
          'end: ' + item.end + '?';

      prettyConfirm('Move item', title, function (ok) {
        if (ok) {
          callback(item); // send back item as confirmation (can be changed)
        }
        else {
          callback(null); // cancel editing item
        }
      });
    },

    onMoving: function (item, callback) {
      if (item.start < min) item.start = min;
      if (item.start > max) item.start = max;
      if (item.end   > max) item.end   = max;

      callback(item); // send back the (possibly) changed item
    },

    onUpdate: function (item, callback) {
      prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
        if (value) {
          item.content = value;
          callback(item); // send back adjusted item
        }
        else {
          callback(null); // cancel updating the item
        }
      });
    },

    onRemove: function (item, callback) {
      prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
        if (ok) {
          callback(item); // confirm deletion
        }
        else {
          callback(null); // cancel deletion
        }
      });
    }
  };
  var timeline = new vis.Timeline(container, items, options);

  items.on('*', function (event, properties) {
    logEvent(event, properties);
  });

  function logEvent(event, properties) {
    var log = document.getElementById('log');
    var msg = document.createElement('div');
    msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
        'properties=' + JSON.stringify(properties);
    log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
  }

  function prettyConfirm(title, text, callback) {
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55"
    }, callback);
  }

  function prettyPrompt(title, text, inputValue, callback) {
    swal({
      title: title,
      text: text,
      type: 'input',
      showCancelButton: true,
      inputValue: inputValue
    }, callback);
  }