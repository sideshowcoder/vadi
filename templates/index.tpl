%# template for index page of vadi
<html>

<head>
  <link href="/static/css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <link href="/static/css/print.css" media="print" rel="stylesheet" type="text/css" />
  <!--[if lt IE 8]>
      <link href="/static/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <![endif]-->
  <link href="/static/css/jquery-ui.css" rel="stylesheet" type="text/css"/>  
  <script type="text/javascript" src="/static/js/libs/jquery.js"></script>
  <script type="text/javascript" src="/static/js/libs/jquery-ui.min.js"></script>
  <script type="text/javascript" src="/static/js/app.js"></script>          
</head>

<body>
  <div class='two-col'>
    <div id='header'>
      <h1>Vadi - Vermont analyse data interface</h1>
    </div>
    <div id='sidebar'>
      <ul>
        <li>
          <a id="analysebtn" href='#'>Analyse</a>
        </li>
        <li>
          <div id="progress"></div>
          <div id="status"></div>
        </li>
      </ul>
    </div>
    <div id='content'>      
    </div>
  </div>
</body>

</html>