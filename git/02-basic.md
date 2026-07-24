- Quá trình : 
+ Working dir.
+ git add : sẽ đẩy thay đổi vào staging area.
+ git commit : sẽ vào checking stage, tạo ra 1 check point.
+ Tạo file gitignore : lên google tìm gitignore generator.


# Git log

- git log : show toàn bộ logs
- git log --oneline : show logs kiểu gút gọn.


# Atomic commits : 
- 1 commit does 1 job, keep commits centreic to one feature, one component or one fix.
- Mỗi commit sẽ phụ thuộc vào commit trước đó, trừ commit đầu tiên.
- Mỗi commit sẽ có hash, có parent trỏ về commit trước đó. null với commit đầu tiên.




# Git config 
- git config --global user.name "your name"
- git config --global user.name : show user name.

- git config --global user.email "youremail@.com"
- git config --global user.email

- git config --global core.editor "code --wait" : thay vì open vim để thao tác, nó sẽ mở file để thao tác như commit.

- Truy cập vào file config.
+ cd vào folder root. cd ~ 
+ cat .gitconfig


# branch
git branch nav-bar : tạo nhánh nav-bar nhưng ko checkout qua.
git checkout nav-bar : checkout qua nav-bar.
+ Head sẽ luôn point tới branch hiện tại.
- Xóa branch : git branch -d branch-name
- Tạo branch : git switch -c new-branch

# git merge
- at current branch : git merge branch-name

# Git Diff
- So sánh file ở 2 thời điểm, commit khác nhau.
- `---`: là file cũ , file trước đó.
- git diff --staged : sau khi git add ; sẽ show sự khác nhau giữa file trước khi change và file in staged.
- git diff commit1 commit2 | git diff commit1..commit2

# git stash
- git stash : lưu vào stash.
- git stash list : show list stash.
- git stash apply nameStash : apply stash mà ko pop ra.

# git checkout <hash>
- git checkout <hash> : checkout qua commit trước đó, lưu ý git log sẽ mất các log mới nhất.
- để trở lại : git checkout lại nhánh đã ở trước đó.
- Hoặc git reflog : show ra bước trước đó đã thực hiện.??
- git checkout HEAD~2 : tử head checkout về 2 commit trước đó, thay số 2 bằng số khác.
```
hash1 Head -> master
hash2 ...
hash3 ...
hash4 ...

git checkout HEAD~2 => 
HEAD -> hash4.

git checkout master : trở lại như cũ.

```

# git rebase.
- Được dùng khá giống git merge, hoặc như là 1 clean up tool vì nó thay đổi history.
- Nếu đang ở branch master/main không bao giờ chạy lệnh này.
- Việc git merge sẽ tạo ra các commit merge dư thừa.
