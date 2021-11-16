# Navigating the JupiterOne Graphs

J1 is built on a data-driven graph platform. For the story that inspired J1 to build it, 
read [the J1 blog](https://jupiterone.com/blog/three-dimensional-security/).

JupiterOne Query Language (J1QL) is designed to traverse this graph and return a
subgraph, or data from the nodes (assets) and edges (relationships) of a subgraph. 
You can view and interact with the subgraph from any J1QL query result.

This documentation focuses on interacting with the graph component. For more 
details on J1QL, read the [J1QL tutorial](tutorial-j1ql.md) and [technical doc](../docs/jupiterone-query-language.md).

This is an example result graph from a query in the Search for Anything app:

![](../assets/j1ql-tutorial-root-accounts-graph.png)

The first set of controls in the upper-right corner comprises:

|                     Control                     | Function                                                     |
| :---------------------------------------------: | :----------------------------------------------------------- |
|   ![query-eye](../assets/icons/query-eye.png)   | Switch views between `Table`, `Graph`, `Raw JSON`, and `Pretty JSON`. |
| ![query-share](../assets/icons/query-share.png) | Export and share the query by sharing a link or downloading as a CSV or JSON file. |
|  ![query-copy](../assets/icons/query-copy.png)  | Copy the query to the clipboard to reuse.                    |
|  ![query-save](../assets/icons/query-save.png)  | Save the query shows a modal popup where you can provide a title, description, and, optionally, some tags to save it to your own query library. |
| ![query-close](../assets/icons/query-close.png) | Close and remove the results for this specific query/question from the page view. |

Selecting any node on the graph displays a set of controls directly on top of 
it that allows you to interact with the node. The controls provide the
following functions:

|                          Control                          | Function                                                     |
| :-------------------------------------------------------: | ------------------------------------------------------------ |
| ![query-properties](../assets/icons/query-properties.png) | Open the side panel to show the detailed properties, tags, and metadata of the selected asset. You can select an edge and see the relationship properties in the side panel as well. |
|  ![query-show-more](../assets/icons/query-show-more.png)  | Display additional asset nodes that are directly connected to the selected asset but are not yet loaded into the graph. |
|       ![query-hide](../assets/icons/query-hide.png)       | Hide the asset from the graph to reduce clutter. You can unhide all hidden assets from the bottom-left control. |
|     ![query-explan](../assets/icons/query-explan.png)     | Expand grouped nodes of the same type that have the same parent nodes. This option may not be always available depending on the data in the graph. |
|   ![query-collapse](../assets/icons/query-collapse.png)   | Collapse nodes of the same type that have the same parent nodes into a group. This option may not be always available depending on the data in the graph. |

The last set of controls are at the bottom-left of the graph, and they provide the 
following functions:

| Control | Function|
|:-------:| --------|
| ![query-filter](../assets/icons/query-filter.png) | Open the filter panel to show or hide assets on the graph by account and/or type. |
| ![query-lock](../assets/icons/query-lock.png) | Lock the movement of connected assets. |
| ![query-layout1](../assets/icons/query-layout1.png) ![query-layout2](../assets/icons/query-layout2.png)![query-layout3](../assets/icons/query-layout3.png) | Toggle the layout between these three types. |
| ![query-fullscreen](../assets/icons/query-fullscreen.png) | Maximize the graph in full-screen mode. |
| ![query-drag](../assets/icons/query-exit-full.png) | Exit full-screen mode. |
| ![query-camera](../assets/icons/query-camera.png) | Download the image. |
| ![query-center](../assets/icons/query-center.png) | Center the graph. |
| ![query-undo](../assets/icons/query-undo.png) | Undo the action. |
| ![query-eye](../assets/icons/query-eye.png) | Unhide hidden asset nodes. This control icon only displays when there are hidden nodes on the graph. |

Here's a screenshot of a graph with the side property panel and filter panel
open:

![](../assets/aws-inspector-guardduty-findings-graph.png)

**Zoom and Move**

|                           Control                            | Function                                                     |
| :----------------------------------------------------------: | ------------------------------------------------------------ |
| ![query-zoom-in](../assets/icons/query-zoom-in.png) ![query-zoom-out](../assets/icons/query-zoom-out.png) | Scroll using your mouse/touchpad to zoom in/out on the graph. |
|        ![query-drag](../assets/icons/query-drag.png)         | Click and drag on a blank spot on the graph using your mouse/touchpad to move the graph. Click and drag on a selected asset node to move that particular node. |

The Graph Viewer app uses the same sets of controls.

To learn more about queries and graphs, read the [J1QL tutorial](tutorial-j1ql.md).
