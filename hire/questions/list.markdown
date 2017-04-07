---
layout: hire
title: List | Inkoop
description: List
---
# List

Build the below question in Javascript with following rules-

  * Make a html page with a UL element with 3 list items with text - A, B, C.

  * Clicking on any li element should add child list to it with proper naming.

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

You can use any javascript plugin you are familiar with.

Please send your solution to <a href= "mailto:hire@inkoop.in">hire@inkoop.in</a>

Working Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/8pJTws2zeZc" frameborder="0" allowfullscreen></iframe>
