/*export const getLocationService = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}*/

class Location {
  constructor() {
    this.URL = "https://nominatim.openstreetmap.org"
  }

  getCords() {
    let coords = { latitude: 0, longitude: 0 }

    navigator.geolocation.getCurrentPosition((position) => {
      coords = position.coords
    })

    return coords
  }

  getPosition = async () => {
    const { latitude, longitude } = this.getCords()

    const url = `${this.URL}/reverse?format=json&lat=${latitude}&lon=${longitude}`

    try {
      const data = await fetch(url)
      const result = await data.json()

      return result
    } catch (err) {
      console.log(err)
    }
  }
}

export const LocationService = new Location()
