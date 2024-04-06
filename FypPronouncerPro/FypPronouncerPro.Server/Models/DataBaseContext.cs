﻿using Microsoft.EntityFrameworkCore;
namespace FypPronouncerPro.Server.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<StudentsModel> Students { get; set; }
        public DbSet<LessonsModel> Lessons { get; set; }
        public DbSet<MispronunciationsModel> Mispronunciations { get; set; }
        public DbSet<UserLessonsModel> UserLessons { get; set; }
        public DbSet<VocabularyModel> Vocabulary { get; set; }

    }
}
