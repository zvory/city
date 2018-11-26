import numpy as np
import json
from scipy.spatial import ConvexHull

def minimum_bounding_rectangle(points):
    """
    Find the smallest bounding rectangle for a set of points.
    Returns a set of points representing the corners of the bounding box.

    :param points: an nx2 matrix of coordinates
    :rval: an nx2 matrix of coordinates
    """
    from scipy.ndimage.interpolation import rotate
    pi2 = np.pi/2.

    # get the convex hull for the points
    hull_points = points[ConvexHull(points).vertices]

    # calculate edge angles
    edges = np.zeros((len(hull_points)-1, 2))
    edges = hull_points[1:] - hull_points[:-1]

    angles = np.zeros((len(edges)))
    angles = np.arctan2(edges[:, 1], edges[:, 0])

    angles = np.abs(np.mod(angles, pi2))
    angles = np.unique(angles)

    # find rotation matrices
    # XXX both work
    rotations = np.vstack([
        np.cos(angles),
        np.cos(angles-pi2),
        np.cos(angles+pi2),
        np.cos(angles)]).T
#     rotations = np.vstack([
#         np.cos(angles),
#         -np.sin(angles),
#         np.sin(angles),
#         np.cos(angles)]).T
    rotations = rotations.reshape((-1, 2, 2))

    # apply rotations to the hull
    rot_points = np.dot(rotations, hull_points.T)

    # find the bounding points
    min_x = np.nanmin(rot_points[:, 0], axis=1)
    max_x = np.nanmax(rot_points[:, 0], axis=1)
    min_y = np.nanmin(rot_points[:, 1], axis=1)
    max_y = np.nanmax(rot_points[:, 1], axis=1)

    # find the box with the best area
    areas = (max_x - min_x) * (max_y - min_y)
    best_idx = np.argmin(areas)

    # return the best box
    x1 = max_x[best_idx]
    x2 = min_x[best_idx]
    y1 = max_y[best_idx]
    y2 = min_y[best_idx]
    r = rotations[best_idx]

    rval = np.zeros((4, 2))
    rval[0] = np.dot([x1, y2], r)
    rval[1] = np.dot([x2, y2], r)
    rval[2] = np.dot([x2, y1], r)
    rval[3] = np.dot([x1, y1], r)

    return rval


with open('buildings.json') as f:
    data = json.load(f)


# data = {"type":"FeatureCollection",
#  "features":[{"type":"Feature",
#               "properties":{"osm_id":"1269601",
#                             "type":"multipolygon",
#                             "leisure":"pitch",
#                             "sport":"soccer"},
#               "geometry":{
#                   "type":"Polygon",
#                   "coordinates":[[
#                       [6.6131123,46.5124914],
#                       [6.6129421,46.5125385],
#                       [6.6127998,46.5125783],
#                       [6.6126291,46.512626],
#                       [6.6125308,46.5124593],
#                       [6.6127016,46.5124121],
#                       [6.6128452,46.5123724],
#                       [6.6130153,46.5123244],
#                       [6.6131123,46.5124914]]
#                   ]
#               }
#              }
#             ]
#       }


for i in range(len(data["features"])):
  # print(data["features"][i])

  # polygons can have holes, so, ["coordinates"][0] gives you boundary of polygon.
  # If you have multipolygon, ["coordinates"][0][0] gives you the first polygon boundary.
  geom = data["features"][i]["geometry"]["coordinates"][0]

  mabr = minimum_bounding_rectangle(np.array(geom))

  # OUT:
  #array[[  6.6131123 ,  46.5124914 ],
  #      [  6.61306213,  46.51231129],
  #      [  6.6125308 ,  46.5124593 ],
  #      [  6.61258097,  46.51263941]]

  # output = {
  #   "points": mabr.tolist(),
  #   "height": data["features"][i]["properties"]["other_tags"].encode('utf-8')
  # }
  print mabr.tolist()
  print data["features"][i]["properties"]["other_tags"].encode('utf-8')
  # print data["features"][i]["properties"]["other_tags"]["height"]
  # output["points"] = mabr.tolist()
  # output["height"] = data["features"][i]["properties"]["other_tags"]["height"]
  # print output

  # print '{"points":',mabr.tolist(),",\"other\": '", data["features"][i]["properties"]["other_tags"].encode('utf-8'),"'}"


  data2 = dict(data) # copy data to data2    
  data2["features"][i]["geometry"]["coordinates"][0] = mabr.tolist()

  

# print data2