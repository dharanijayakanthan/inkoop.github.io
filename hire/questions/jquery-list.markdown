---
layout: blog
title: Jquery List | Inkoop
description: Jquery List
---
# Jquery List

* Make a html page with a UL element with 3 list items with text - A, B, C.

* Check the html below for more info. Clicking on any li element should add child list to it with proper naming.

* You can use any javascript framework/plugin or plain javascript.

<p>
Clicking on B
  <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
  </ul>
  will change the html to

  <ul>
      <li>A</li>
      <li>
          B
          <ul>
              <li>B1</li>
          </ul>
      </li>
      <li>C</li>
  </ul>
  Clicking on B1 will change it to

  <ul>
      <li>A</li>
      <li>
          B
          <ul>
              <li>
                  B1
                  <ul>    
                      <li>B11</li>
                  </ul>
              </li>
              </li>
          </ul>
      </li>
      <li>C</li>
  </ul>
</p>

Please send your solution to <a href= "mailto:vivek@inkoop.in">vivek@inkoop.in</a>

Working Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/8pJTws2zeZc" frameborder="0" allowfullscreen></iframe>