-- ============================================================
--  Seed data — run ONCE after schema.sql
--  Supabase → SQL Editor → paste & run
-- ============================================================

-- Site contact settings (from site.ts)
update public.site_settings set
  phone           = '+91 92136 10182',
  phone2          = '+91 92208 25187',
  kids_phone      = '+91 92668 74287',
  email           = 'opinstituteofstudies@gmail.com',
  whatsapp        = '919213610182',
  address         = 'A-374/11, Mahavir Enclave, Part-2, New Delhi - 110059',
  branch_address  = 'Bindapur, DDA Flats, Near Deshraj Office, New Delhi',
  kids_address    = 'A-374, Mahavir Enclave, Part-2, Gali No.11, New Delhi - 110059',
  facebook        = 'https://facebook.com/opinstitute',
  instagram       = 'https://instagram.com/opinstitute',
  youtube         = 'https://youtube.com/@opinstitute',
  linkedin        = 'https://linkedin.com/company/opinstitute',
  weekday_hours   = 'Monday – Saturday: 8:00 AM – 7:00 PM',
  sunday_hours    = 'Sunday: Closed',
  preschool_hours = 'OP Kids: 9:00 AM – 1:00 PM',
  updated_at      = now()
where id = 1;

-- Courses (first run — tables empty after schema.sql)
insert into public.courses (name, description, duration, eligibility, features, category, popular, sort_order) values
('CMA – Cost & Management Accountancy', 'Expert guidance for the Cost & Management Accountancy course with emphasis on costing, financial management, and practical problem solving.', 'Foundation / Inter / Final', 'Class 12 pass & graduates', array['Cost & management accounting','Financial management','Practical numerical practice','Regular assessments','One-on-one guidance'], 'professional', true, 1),
('B.Com (Pass & Honours)', 'Comprehensive tuition for B.Com Pass and Honours students covering the complete university syllabus with exam-focused preparation.', '3 Years (Semester-wise)', 'Class 12 pass (Commerce preferred)', array['Complete semester syllabus','Accountancy & economics','Business studies & finance','Previous year papers','Result-oriented teaching'], 'degree', true, 2),
('School Tuition (Class I – VIII)', 'Strong foundation tuition for primary and middle school students across all subjects with personal attention and concept-based learning.', 'Yearly (All Subjects)', 'Class I to VIII students', array['All subjects covered','Homework & concept help','Regular practice tests','Small batches','Individual attention'], 'school', false, 3),
('Class IX & X (CBSE)', 'Board-focused coaching for Class 9 and 10 students with subject expertise, sample paper practice, and regular assessments.', '1 – 2 Years', 'Class 9 & 10 students', array['Subject-wise expert teachers','Sample paper practice','Revision before exams','Parent-teacher meetings','Board exam strategies'], 'school', true, 4),
('Class XI & XII (Commerce)', 'Specialized coaching for Class 11 & 12 Commerce students — Accountancy, Business Studies, Economics — building the base for CMA & B.Com.', '1 – 2 Years', 'Class 11 & 12 Commerce students', array['Accountancy & Economics','Business Studies','Board pattern papers','Career counselling','Doubt sessions'], 'school', false, 5);

-- Faculty
insert into public.faculty (name, qualification, experience, subject, image_url, linkedin, sort_order) values
('CA Amit Verma', 'Chartered Accountant (FCA)', '18 Years', 'Accountancy & CA', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', '#', 1),
('CS Sunita Rao', 'Company Secretary (ACS)', '15 Years', 'Company Law & CS', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', '#', 2),
('Mr. Vikram Singh', 'M.Com, CMA', '12 Years', 'Cost Accounting & CMA', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', '#', 3),
('Dr. Neha Gupta', 'M.A. Economics, Ph.D.', '10 Years', 'Economics', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', '#', 4),
('Mrs. Anjali Mehta', 'M.A. English, B.Ed.', '14 Years', 'English', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', null, 5),
('Mr. Ravi Shankar', 'M.Com, MBA (Finance)', '11 Years', 'Business Studies & B.Com', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', '#', 6),
('Mrs. Kavita Joshi', 'M.Ed., Early Childhood Education', '8 Years', 'OP Kids – Preschool', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', null, 7),
('Mr. Deepak Malhotra', 'M.Sc. Mathematics, B.Ed.', '9 Years', 'Mathematics (School)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', '#', 8);

-- Testimonials
insert into public.testimonials (name, role, content, rating, image_url, category, sort_order) values
('Mrs. Rekha Patel', 'Parent – OP Kids Pre School', 'OP Kids has been a blessing for our family. My daughter wakes up excited every morning to go to school. The teachers are incredibly caring, and we receive regular updates about her progress. Highly recommended!', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', 'preschool', 1),
('Arjun Mehta', 'CMA Student – OP Institute', 'The faculty at OP Institute is exceptional. Their concept clarity in Costing and Financial Management and the regular test series helped me clear my CMA exams. The personal attention made all the difference.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', 'institute', 2),
('Mr. Sanjay Gupta', 'Parent – Class 12 Commerce', 'My son improved from 72% to 94% in his board exams after joining OP Institute. The structured approach, regular tests, and doubt sessions made all the difference. Thank you, team!', 5, null, 'institute', 3),
('Pooja Reddy', 'B.Com Student – OP Institute', 'The teachers explain every semester topic so clearly that B.Com became easy for me. The previous-year paper practice and doubt sessions boosted my confidence for university exams.', 5, 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80', 'institute', 4),
('Rahul Sharma', 'Class 10 Student – 96%', 'The teachers here don''t just teach — they inspire. The revision sessions before boards were incredibly helpful. I''m proud to be an OP Institute student.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', 'institute', 5),
('Mrs. Ananya Desai', 'Parent – OP Kids Nursery', 'The colorful classrooms, safe environment, and loving teachers make OP Kids the best preschool in the area. My son has learned so much while having the time of his life!', 5, null, 'preschool', 6),
('Mr. Imran Khan', 'Parent – OP Kids Play Group', 'As working parents, the app-based updates give us complete peace of mind. We can see photos and daily activities. My daughter has become so confident and social since joining OP Kids.', 5, null, 'preschool', 7),
('Mrs. Sunita Verma', 'Parent – OP Kids LKG', 'The Montessori-based learning and the yoga & dance room are wonderful. The low child–teacher ratio means my son gets real attention. Best decision we made for his early years.', 5, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', 'preschool', 8),
('Neha Agarwal', 'CMA Student – OP Institute', 'Clearing CMA felt achievable because of the structured guidance here. The cost accounting and management classes were detailed and the mentors were always available for doubts. Truly grateful.', 5, null, 'institute', 9);

-- Events
insert into public.events (title, event_date, description, image_url, type, sort_order) values
('Annual Day Celebration 2025', 'December 15, 2025', 'A grand celebration showcasing student talents through performances, awards, and cultural programs.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', 'cultural', 1),
('OP Kids Summer Camp', 'May 20 – June 10, 2025', 'Fun-filled summer camp with art, craft, storytelling, swimming, and adventure activities for kids.', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', 'preschool', 2),
('CMA Test Series', 'Every Sunday', 'Full-length mock tests for CMA students with detailed analysis and performance feedback.', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80', 'academic', 3),
('Sports Day 2025', 'January 26, 2025', 'Inter-house sports competitions including athletics, cricket, football, and fun races for all age groups.', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80', 'sports', 4),
('Parent-Teacher Meet', 'First Saturday Monthly', 'Regular parent-teacher meetings to discuss student progress and collaborative learning strategies.', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80', 'academic', 5),
('Festival Celebrations', 'Throughout the Year', 'Diwali, Holi, Christmas, and Independence Day celebrations teaching cultural values and unity.', 'https://images.unsplash.com/photo-1605810230434-7631ac76ecb0?w=600&q=80', 'cultural', 6),
('Science Exhibition', 'February 28, 2025', 'Students showcase innovative science projects and experiments in our annual science fair.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80', 'academic', 7),
('OP Kids Fancy Dress', 'November 14, 2025', 'Adorable fancy dress competition for preschoolers celebrating Children''s Day with creativity and fun.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', 'preschool', 8);

-- Gallery
insert into public.gallery (image_url, alt, category, sort_order) values
('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', 'Modern classroom with students', 'classroom', 1),
('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', 'Preschool children learning', 'preschool', 2),
('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', 'Campus building exterior', 'campus', 3),
('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', 'Children playing outdoors', 'preschool', 4),
('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', 'Annual day celebration', 'events', 5),
('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', 'Students in science lab', 'classroom', 6),
('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', 'Award ceremony', 'achievements', 7),
('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80', 'Sports day activities', 'events', 8),
('https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', 'Science exhibition', 'classroom', 9),
('https://images.unsplash.com/photo-1605810230434-7631ac76ecb0?w=800&q=80', 'Festival celebration', 'events', 10),
('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', 'Library and study zone', 'campus', 11),
('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', 'Computer lab', 'classroom', 12);
