export default class GameObjectManager {
  constructor(gameObjects) {
    this.gameObjects = gameObjects;
  }

  update(deltaTime) {
    this.gameObjects.forEach((gameObject, idx) => {
      gameObject.update(deltaTime);
      if(gameObject.readyForDelete) this.gameObjects.splice(idx, 1)
    });
  }

  draw(context) {
    this.gameObjects.forEach((gameObject) => {
      gameObject.draw(context);
    });
  }

}