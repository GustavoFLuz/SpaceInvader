class ProjectilesController{
    update(){
        spaceshipProjectiles.forEach((projectile, index) =>{
            projectile.position.y <= 0?spaceshipProjectiles.splice(index,1):projectile.update();
        })
        invaderProjectiles.forEach((projectile, index) =>{
            projectile.position.y >= canvas.height?invaderProjectiles.splice(index,1):projectile.update();
        })
    }
}