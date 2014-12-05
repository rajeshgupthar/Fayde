﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace LitmusTests.Tests
{
    public partial class ContentControlTest : UserControl
    {
        public ContentControlTest()
        {
            InitializeComponent();
            First.Content = new Controls.TestClass();
            Second.DataContext = new Controls.TestClass();
        }
    }
}
