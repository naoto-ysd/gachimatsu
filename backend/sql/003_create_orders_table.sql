-- メニュー評価テーブル  
CREATE TABLE menu_ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    menu_id INT,
    rating INT CHECK(rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
