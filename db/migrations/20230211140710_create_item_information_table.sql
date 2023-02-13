-- migrate:up
CREATE TABLE item_information (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_idx INT NOT NULL,
    information varchar(500) NOT NULL,
    CONSTRAINT information_item_idx_fkey FOREIGN KEY (item_idx) REFERENCES stock_items(Id)  
);

-- migrate:down

