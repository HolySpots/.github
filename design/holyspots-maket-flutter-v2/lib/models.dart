// Domain models for the HolySpots admin prototype.
class City {
  String id, name, info, country;
  int spots, routes, photos;
  City(this.id, this.name, this.info, this.country, this.spots, this.routes, this.photos);
}

class Spot {
  String id, name, city, type, coords;
  int photos;
  Spot(this.id, this.name, this.city, this.type, this.coords, this.photos);
}

class RouteItem {
  String name, info;
  int photos;
  bool isGroup;
  RouteItem(this.name, this.info, this.photos, {this.isGroup = false});
}

class MapItem {
  String name, file, size, updated;
  MapItem(this.name, this.file, this.size, this.updated);
}

class Place {
  String name, address, type, city;
  Place(this.name, this.address, this.type, this.city);
}

class Direction {
  String name, info;
  Direction(this.name, this.info);
}

class Review {
  String date, spot, mood, text, email;
  String status; // 'pending' | 'approved'
  Review(this.date, this.spot, this.mood, this.text, this.email, this.status);
}
