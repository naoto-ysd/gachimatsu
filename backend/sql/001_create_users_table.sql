-- ユーザーテーブル作成
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- サンプルデータの挿入
INSERT INTO users (name, email) VALUES 
('田中太郎', 'tanaka@example.com'),
('佐藤花子', 'sato@example.com'),
('山田次郎', 'yamada@example.com');