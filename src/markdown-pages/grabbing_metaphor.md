---
path: "/research/grabbing_metaphor"
prefix: "grabbing_metaphor"
thumbnail: "../images/research/thumbnails/grabbing_metaphor.jpg"
title: "3D Object Manipulation Using Virtual Handles with a Grabbing Metaphor"
tag: "interaction"
date: "2014-12-01"
---

## Description

Virtual Handle with a Grabbing Metaphor (VHGM) is an interaction technique that helps users manipulate 3D objects intuitively. We employ a grabbing metaphor to provide the mapping protocol for finding the desired reference frame. We project the user’s hand into the virtual environment; a virtual-handle avatar provides useful feedback. According to the user’s input, VHGM generates a temporary reference frame for the target object so that the user controls the operation. The user can manipulate the object naturally, perceiving the transformation as if he or she had actually grabbed the object. Because VHGM focuses on the user’s hand, not a particular device, it’s suitable for many 3D input devices.

> ![Figure 1. The virtual handle. (Left) A schematic, in which v_h is the vector of the palm’s direction. (Middle) The 3D input device. (Right) A visualization. The virtual handle matches its direction with that of the palm of the hand holding the device.](../images/research/grabbing_metaphor/img1.jpg)

> ![Figure 2. Finding the virtual handle’s initial position. When the user confirms selection of the object, the system generates a bounding sphere around it. From the sphere’s center, a ray with the direction opposite that of v_h projects to find the intersecting point on the sphere. This point serves as the initial position.](../images/research/grabbing_metaphor/img2.jpg)

> ![Figure 3. Restricting the virtual handle’s movement. A layered bounding sphere guides the virtual handle. q implies the angle based on the motion of the virtual handle positioned at the circumscribed sphere’s center.](../images/research/grabbing_metaphor/img3.jpg)

> ![Figure 4. The virtual environments for the docking task (left) and water-pouring task (right). In first task, the user docked a 3D tetrahedron (the light one) onto a target tetrahedron (the dark one). In the second task, the user mimicked pouring water from a teapot into a cup.](../images/research/grabbing_metaphor/img4.jpg)

> ![Figure 5. The two types of teapots for the waterpouring task, showing the selected centers for a reference frame using VHGM. (The red dots indicate the virtual handle’s positions for all trials.)](../images/research/grabbing_metaphor/img5.jpg)

## Contact

Taeho Kim (kdhtheo at kaist.ac.kr)

## Publications

- Taeho Kim, Jinah Park, "3D interaction methods for medical applications: from the concept to the evaluation," HCI Korea 2015 Doctoral Consortium, December 2014.
- Taeho Kim, Jinah Park, "3D Object Manipulation Using Virtual Handles with a Grabbing Metaphor," IEEE Computer Graphics and Applications, Vol. 34, No. 3, pp. 30-38, May 2014.
- Taeho Kim, Jinah Park, "An Interface for Object Assembly in 3D Virtual Environment using Two Hands Mid-air Interaction (3차원 가상 환경에서의 객체 조립을 위한 양손 공간 인터랙션 기반 인터페이스)," HCI Korea 2014, pp. 1069-1072, February 2014.
- Taeho Kim, Jinah Park, "Virtual Handle with Grabbing Metaphor (직관적인 3차원 객체 조작을 위한 쥠 메타포를 이용한 가상핸들)," Program Registration (No. C-2013-003409), Korea Copyright Commission, February 2013.