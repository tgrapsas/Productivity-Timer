# ⏱️ Productivity-Timer 

Ένα σύγχρονο, full-page web dashboard διαχείρισης εργασιών και καταγραφής χρόνου (Time Tracking) σε πραγματικό χρόνο, σχεδιασμένο ειδικά για developers και freelancers.

Το project εστιάζει στο advanced UI/UX state management και στην αυτόνομη διαχείριση ασύγχρονων live χρονομέτρων με Vanilla JavaScript.

---

## ✨ Χαρακτηριστικά (Features)

* **Full-Page Layout:** Επαγγελματική σχεδίαση που αξιοποιεί όλο το εύρος της οθόνης για βέλτιστη οργάνωση (παρόμοια με enterprise εργαλεία τύπου Jira/ClickUp).
* **Multi-Task Live Timers:** Δυνατότητα αυτόνομης εκκίνησης, παύσης (Pause) και ολοκλήρωσης χρονόμετρου ξεχωριστά για κάθε task, χρησιμοποιώντας `setInterval`.
* **Persistent Theme Switcher:** Πλήρης εναλλαγή μεταξύ Light και Dark Mode με ομαλά CSS transitions. Η προτίμηση του χρήστη αποθηκεύεται μόνιμα στον browser.
* **Real-Time Analytics:** Δυναμικός υπολογισμός και live ενημέρωση των συνολικών tasks καθώς και του συνολικού χρόνου εργασίας (μορφή `HH:MM:SS`).
* **Robust Data Persistence:** Πλήρης αποθήκευση της κατάστασης (State), των χρόνων και των tasks στο `LocalStorage` για διατήρηση των δεδομένων μετά από refresh.

---

## 🛠️ Τεχνολογίες & Τεχνικές Γνώσεις (Tech Stack)

* **HTML5:** Semantic architecture για σωστή δομή.
* **CSS3 (Variables & Layouts):** Χρήση CSS custom properties (`--variables`) για ακαριαία αλλαγή θέματος, Flexbox για το layout και smooth transitions.
* **Vanilla JavaScript (ES6+):**
  * **Timers:** Χρήση `setInterval` και `clearInterval` για τη διαχείριση του χρόνου ανά task ID.
  * **Array Methods:** Αξιοποίηση των `.reduce()` (για υπολογισμό analytics) και `.filter()` (για διαγραφή στοιχείων).
  * **Data Modeling:** Χρήση του `Date.now()` για τη δημιουργία unique IDs στα dynamic αντικείμενα.
