# Electron Path Finder

## Description
My second electron project. Using my base from my first project ([Game Of Life]([https://](https://github.com/Andrew-McCall/electronConwaysGameOfLife))), I made a new editor and wrote an A* path finding algorithm.

A* is a searching algorithm that tries to calculate the shortest distance between two points. It uses the current point's distance from the goal to focus it's checks.

The light pink pixels are the shortest,  
The grey pixels have been completed as their Neighbours have been checked (Animation only),  
The black pixels are impassible "walls",  
The Green is the start,  
The Red is the goal  


## Technologies
- Electron
- JavaScript
- Canvas (JS)
- HTML/CSS

  
## Images
##### New Default Page Searched (After Page Resize Also)  
![New Default ](https://i.imgur.com/bqUX60o.png)  

##### Example Of Editor and Animation  
![Gif Of using the app](https://i.imgur.com/jZKwisf.gif)  

##### Example Of A Maze Searched  
![Maze Search](https://i.imgur.com/9gh3OVd.png)  

## Download Package

[Package Download](https://github.com/Andrew-McCall/electronPathFinder/raw/main/AStar.zip)

Unzip and run AStar.exe in the folder. Uses electron and is built for Windows x64.

*Don't trust random .exe from the web*

## Future Improvements
- ~~Resize Width~~
- ~~Default Drawing~~
- ~~Recursive Path Backtrack~~
- ~~Variable Animation Speed~~
- ~~(Grey Searched Pixels Without Animation)~~
- Save Drawing / Load Drawing

## Licence
MIT License

Copyright (c) 2022 Andrew McCall
