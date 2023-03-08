SQLite 構成ツール
===
```
Create : 2023.03.08
Author : Yugeta.Koji
```

# Summary
- SQLiteのデータ内部の構造やデータを視覚化するツール。

# Envelopment
- php + sqlite3




# SQL構築
- [LABEL_GROUP] ラベルグループマスターテーブル
```
CREATE TABLE LABEL_GROUP (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  update_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);
```

- [LABEL_MASTER] ラベル名テーブル
```
CREATE TABLE LABEL_NAME (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  label_group_id INTEGER,
  create_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  update_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);
```

- [MENU_EXTEND] 拡張基本テーブル
```
CREATE TABLE MENU_EXTEND (
  id INTEGER PRIMARY KEY,
  platform TEXT,
  site_code TEXT,
  menu_id TEXT,
  published TIMESTAMP,
  create_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  update_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);
```

- [MENU_EXTEND] 拡張ラベルテーブル
```
CREATE TABLE MENU_EXTEND_LABELS (
  id INTEGER PRIMARY KEY,
  platform TEXT,
  site_code TEXT,
  menu_id TEXT,
  label_name_id INTEGER,
  create_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  update_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
);
```

